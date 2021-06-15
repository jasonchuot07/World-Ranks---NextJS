// import axios from 'axios'
import { useEffect, useState } from 'react'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'

export default function Home({countries}) {
  useEffect(()=>{
    document.title = 'World Ranks | Home'
  },[])

  const [keyword, setKeyword] = useState('')

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(keyword) 
    || country.region.toLowerCase().includes(keyword) 
    || country.region.toLowerCase().includes(keyword)
  )

  const onChangeInput = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found: {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput placeholder="Filter by Name, Region or Sub-Region" onChange={onChangeInput} />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  
  const data = await fetch('https://restcountries.eu/rest/v2/all').then(res=>res.json())
  return {
    props: {
      countries: data,
    },
  };
};