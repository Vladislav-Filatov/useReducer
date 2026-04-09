import {ChangeEvent, useEffect, useReducer} from 'react';
import './App.css';
import { User } from './types';

interface State {
  searchQuery: string,
  currentUser: User | null
}

interface SetSearchQuery {
  type: 'setSearchQuery',
  payload: string
}

interface SetCurrentUser {
  type: 'setCurrentUser',
  payload: User | null
}

type Action = SetSearchQuery | SetCurrentUser;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setSearchQuery':
      return {
        ...state,
        searchQuery: action.payload
      }
    case 'setCurrentUser' :
      return {
        ...state,
        currentUser: action.payload
      }
    default: return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    searchQuery: '',
    currentUser: null,
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setSearchQuery',
      payload: e.target.value
    })
  }

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?username=${state.searchQuery}`
        );
        const resJson = await response.json();
        dispatch({
          type: 'setCurrentUser',
          payload: resJson[0] ?? null,
        })
      } catch {
        dispatch({
          type: 'setCurrentUser',
          payload: null,
        })
      }
    };

    void fetchFunc();
  }, [state.searchQuery]);

  return (
    <div className="card">
      <input type="search" value={state.searchQuery} onChange={handleOnChange} />
      {state.currentUser ? (
        <div>
          <h3>{state.currentUser.name}</h3>
          <h3>{state.currentUser.username}</h3>
          <h3>{state.currentUser.email}</h3>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default App;
