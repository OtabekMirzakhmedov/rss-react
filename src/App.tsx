import { Component } from 'react';
import { getPeople } from './services/SwapiService';
import { Person } from './types/Person';
import PersonCard from './components/card-component/PersonCard';
import SearchComponent from './components/search-component/SearchComponent';
import ErrorBoundary from './components/error-bound-component/ErrorBound';
import './App.css';

interface PeopleListState {
  people: Person[];
}

class App extends Component<Record<string, never>, PeopleListState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      people: [],
    };
  }

  async componentDidMount() {
    try {
      const data = await getPeople(1);
      this.setState({ people: data });
    } catch (err) {
      console.error('Failed to fetch people:', err);
    }
  }

  handleSearchResults = (results: Person[]) => {
    this.setState({ people: results });
  };

  render() {
    const { people } = this.state;

    return (
      <div>
        <h1>Star Wars Characters</h1>
        <ErrorBoundary>
          <SearchComponent onSearchResults={this.handleSearchResults} />
          <div className='people-list'>
            {people.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
