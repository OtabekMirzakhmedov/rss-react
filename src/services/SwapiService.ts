import axios from 'axios';
import { Person } from '../types/Person';

const BASE_URL = 'https://swapi.dev/api';

export const getPeople = async (page: number = 1): Promise<Person[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/people`, {
      params: { page },
    });
    const people: Person[] = response.data.results;
    return people;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

export const getPeopleByName = async (name: string): Promise<Person[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/people/`, {
      params: { search: name },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching people by name:', error);
    throw error;
  }
};
