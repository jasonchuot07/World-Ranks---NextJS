import Layout from "../../components/Layout/Layout"
import styles from './country.module.css'
import CountUp from "react-countup"
import { useEffect, useState } from "react";

const thousandSeperator = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const rankingIcon = (number) => {
    if (number === 0) {
        return '👿'
    }
    if (number > 0 && number < 25) {
        return '😠'
    }
    if (number > 25 && number < 50) {
        return '🙁'
    }
    if (number > 50 && number < 60) {
        return '😐'
    }
    if (number > 60 && number < 80) {
        return '🙂'
    } 
    if (number > 80 && number < 100) {
        return '😍'
    } 
}

const getCountry = async(id) => {
    const country = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`).then(result => result.json())
    return country
}

const CountryDetailItem = ({label, value, icon}) => {
    return (
        <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>{label}</div>
            <div className={styles.details_panel_value}>{value} {icon}</div>
        </div>
    )
}

const Country = ({country}) => {
    console.log(country)
    const [borders, setBorders] = useState([])

    const getBorders = async() => {
        const borders = await Promise.all(country.borders.map(border => getCountry(border)))
        setBorders(borders)
    }
    
    useEffect(() => {
        getBorders()
    },[])

    return <Layout title={country.name}>
        <div className={styles.container}>

            <div className={styles.container_left}>
                <div className={styles.overview_panel}>
                    <img src={country.flag} alt={country.name} />

                    <h1 className={styles.overview_name}>{country.name}</h1>
                    <div className={styles.overview_region}>{country.region}</div>

                    <div className={styles.overview_sub_panel}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>
                                <CountUp start={0} separator="," duration={3} end={country.population} />
                            </div>
                            <div className={styles.overview_label}>Population</div>
                        </div>
                        <div className={styles.overview_area}>
                            <div className={styles.overview_value}>
                                <CountUp start={0} separator="," duration={3} end={country.area} />
                            </div>
                            <div className={styles.overview_label}>Area</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.container_right}>
                <div className={styles.details_panel}>
                    <h4 className={styles.details_panel_header}>Details</h4>
                    
                    <CountryDetailItem label='Capital' value={country.capital} icon='🛕' />

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Languages</div>
                        <div className={styles.details_panel_value}>{country.languages.map(({name})=> name).join(', ')}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Currencies</div>
                        <div className={styles.details_panel_value}>{country.currencies.map(({name})=> name).join(', ')}</div>
                    </div>

                    <CountryDetailItem label='Native Name' value={country.nativeName} />
                    <CountryDetailItem label='Phone Code' value={`+(${country.callingCodes[0]}) XXXX.XXX 📞`} />
                    <CountryDetailItem label='Numeric Code' value={country.numericCode} />
                    <CountryDetailItem label='TimeZones' value={`${country.timezones} ⏱`} />
                    <CountryDetailItem label='Latitude & Longitude' value={`[${country.latlng[0]}, ${country.latlng[1]}]`} />

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Gini</div>
                        <div className={styles.details_panel_value}>{country.gini}% {rankingIcon(country.gini)}</div>
                    </div>

                    <CountryDetailItem label='Sub-Region' value={country.subregion} />

                    <div className={styles.details_panel_borders}>
                        <div className={styles.details_panel_borders_label}>Neighbour Countries</div>
                        <div className={styles.details_borders_container}>
                            {borders.map(({flag, name}) => <div key={name} className={styles.details_panel_borders_country}>
                                <img src={flag} alt={name} />
                                <div className={styles.details_panel_borders_name}>{name}</div>
                            </div>)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </Layout>
}

export default Country

export const getServerSideProps = async ({params}) => {

    const country = await getCountry(params.id)
    return {
        props: {
            country
        }
    }
}