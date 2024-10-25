const mydroneId = 65011104

const DRONE_CONFIG_Url = `https://app-tracking.pockethost.io/api/collections/drone_logs/records?filter=(drone_id=${mydroneId})`;
const DRONE_LOG_Url = 'https://app-tracking.pockethost.io/api/collections/drone_logs/records'

// data in viewlog
const divConfig = document.querySelector('#logs_table')

// form from temp
const divForm = document.querySelector('#status_data')
const myForm = document.querySelector('#myform')
const statusPosting = document.querySelector('#status_posting')



var my_config

const getConfig = async (droneId) =>{
    const rawData = await fetch (DRONE_CONFIG_Url)
    const jsonData = await rawData.json()

    console.log({jsonData})
    return jsonData.items[0]
}

// const displayWaiting

const displayConfig = (config) =>{
    const html = `
        <ul>
            <p>Drone ID: ${config.drone_id}</p>
            <p>Drone Name: ${config.drone_name}</p>
            <p>Country: ${config.country}</p>
        </ul>
    `
    divForm.innerHTML = html
}

const displayStatus = (msg)=>{
    statusPosting.innerHTML = msg
}

const postlog = async (data) =>{
    fetch(DRONE_LOG_Url,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
    })

}

const main = async ()=>{
    console.log(`Drone ID: ${mydroneId}`)
    
    const myConfig = await getConfig(mydroneId)
    my_config = myConfig
    displayConfig(myConfig)

    myForm.addEventListener('submit', async(e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
        const temperature = data.get("temperature")

        const log = {
            drone_id:mydroneId,
            drone_name:my_config.drone_name,
            celsius: temperature,
            country: my_config.country
        }
        displayStatus("Posting log")
        await postlog(log)
        displayStatus("Posting done")
    })
}

main()