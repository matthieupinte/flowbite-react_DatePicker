import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, useHits, useSearchBox } from "react-instantsearch";
import { format } from 'date-fns';
import "twin.macro";

const APP_ID = 'H5IE0TSH1A';
const API_KEY = '8135c22ab9185ac5b903a6de3165dd79';
const INDEX_NAME = 'mooncard_development_matthieu_pinte';

const searchClient = algoliasearch(APP_ID, API_KEY);

const Hit = ({ hit }) => (
  <tr>
    <td>{format(hit.date, 'P')}</td>
    <td>{hit.merchant_name}</td>
    <td>{hit.title}</td>
    <td>{hit.user_name}</td>
    <td>{hit.expense_category}</td>
    <td>{hit.receipt}</td>
    <td>{hit.amount}</td>
  </tr>
)

const CustomHits = (props) => {
  const { hits, sendEvent } = useHits(props);

  return (
    <>
      {hits.map((hit) => <props.hitComponent hit={hit} key={hit.objectID} onClick={() => sendEvent('click', hit, 'Hit Clicked')} />)}
    </>
  )
}

const CustomSearchBox = (props) => {
  const { query, refine, /* clear */ } = useSearchBox(props);
  const [value, setValue] = useState(query);

  const setQuery = (value) => {
    setValue(value);
    refine(value);
  };

  return (
    <form action="" role="search" noValidate>
      <input type="search" value={value} onChange={e => setQuery(e.target.value)} />
    </form>
  );
}

const Filters = () => (
  <aside tw="absolute top-0 left-0 z-40 w-64 h-screen p-4">
    <div>
      <h2>Search</h2>
      <CustomSearchBox />
    </div>
  </aside>
)

function App() {
  return (
    <section>
      <h1 tw="text-center">React App with Twin</h1>
      <div tw="relative p-4">
        <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
          <Filters />
          <div tw="ml-64">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>Description</th>
                  <th>Collaborator</th>
                  <th>Kind</th>
                  <th>Justificatif</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <CustomHits hitComponent={Hit} />
              </tbody>
            </table>
          </div>
        </InstantSearch>
      </div>
    </section>
  );
}

export default App;
