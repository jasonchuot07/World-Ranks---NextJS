import axios from "axios"

const covid_19_api = 'https://covid19.mathdro.id/api'

export const Covid_19 = async () => {
    try {
        const res = axios.get(covid_19_api).then(result => result.data)
        return res
    } catch (err) {
        return err
    }
}