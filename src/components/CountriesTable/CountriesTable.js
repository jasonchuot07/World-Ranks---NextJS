import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons'
import { useState } from 'react'
import Link from 'next/link'
import styles from './CountriesTable.module.css'
import { useCountUp } from 'react-countup'

// const randomNumber = (min, max) => {
//     return Math.floor(Math.random() * max) + min
// }

const orderBy = (countries, value, direction) => {
    if (direction === 'asc') {
        return [...countries].sort((a,b) => a[value] > b[value] ? 1 : -1)
    }
    if (direction === 'desc') {
        return [...countries].sort((a,b) => a[value] > b[value] ? -1 : 1)
    }
    return countries
}

const SortArrow = ({direction}) => {
    if (!direction) {
        return <></>
    } else if (direction === 'desc') {
        return  <div className={styles.header_arrow}>
            <KeyboardArrowDownRounded color="inherit" />
        </div>
    } else {
        return <div className={styles.header_arrow}>
            <KeyboardArrowUpRounded color="inherit" />
        </div> 
    }
}

const NumberAnimate = ({...rest}) => {
    const {countUp} = useCountUp({...rest})
    return <>{countUp}</>
}

const CountriesTable = ({countries}) => {


    const [arrDirection, setArrDirection] = useState()
    const [value, setValue] = useState()
    const orderedCountries = orderBy(countries, value , arrDirection)

    const changeDirection = () => {
        if (!arrDirection) {
            setArrDirection('desc')
        } else if (arrDirection === 'desc') {
            setArrDirection('asc')
        } else {
            setArrDirection(null)
        }
    }

    const setValueAndDirection = (value) => {
        changeDirection()
        setValue(value)
    }
    return (
        <div>
            <div className={styles.header}>

                <div className={styles.header_flag}></div>

                <button className={styles.header_name} onClick={() => setValueAndDirection('name')}>
                    <div>Name</div>
                    {value === 'name' && <SortArrow direction={arrDirection} />}
                    
                </button>

                <button className={styles.header_population} onClick={() => setValueAndDirection('population')}>
                    <div>Population</div>
                    {value === 'population' && <SortArrow direction={arrDirection} />}
                </button>

                <button className={styles.header_area} onClick={() => setValueAndDirection('area')}>
                    <div>Area (km <sup style={{fontSize:'.5rem'}}>2</sup>)</div>
                    {value === 'area' && <SortArrow direction={arrDirection} />}
                </button>

                <button className={styles.header_gini} onClick={() => setValueAndDirection('gini')}>
                    <div>Gini</div>
                    {value === 'gini' && <SortArrow direction={arrDirection} />}
                </button>

            </div>
            {orderedCountries && orderedCountries.map((country,i)=> (
                <Link key={i} href={`/country/${country.alpha3Code}`}>
                    <div key={country.name} className={styles.row}>

                        <div className={styles.flag}>
                            <img src={country.flag} alt={country.name} />
                        </div>

                        <div className={styles.name}>{country.name}</div>

                        <div className={styles.population}>
                            <NumberAnimate start={0} separator="," delay={1} duration={2.5} end={country.population} />
                        </div>
                        <div className={styles.area}>
                            <NumberAnimate start={0} separator="," delay={1} duration={2.5} end={country.area} />
                        </div>
                        <div className={styles.gini}>
                            <NumberAnimate start={0} separator="," delay={1} duration={2.5} end={country.gini} />%
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CountriesTable
