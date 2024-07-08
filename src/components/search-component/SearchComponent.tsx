import { Component, ChangeEvent, FormEvent } from 'react';
import { getPeopleByName } from '../../services/SwapiService';
import { Person } from '../../types/Person';
import './SearchComponent.css'

interface SearchComponentProps {
  onSearchResults: (results: Person[]) => void;
}

interface SearchComponentState {
  searchName: string;
}

class SearchComponent extends Component<SearchComponentProps, SearchComponentState> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = {
      searchName: '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchName: event.target.value });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchName } = this.state;
    try {
      const data = await getPeopleByName(searchName);
      this.props.onSearchResults(data);
    } catch (err) {
      console.error('Failed to fetch people by name:', err);
    }
  };

  render() {
    const { searchName } = this.state;

    return (
        <div className="search-container">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={searchName}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchComponent;
