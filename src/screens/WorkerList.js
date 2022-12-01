import React, {useState, useEffect} from 'react'
import services from '../services'

const WorkerList = props => {

    useEffect(() => {
        services
            .findWorkers({worker: props.route.params.searched, citta: "gorizia"})
            .then(response => {
                console.log("resp ", response.data)
            })
            .catch(err=>{
                console.log("err", err)
            })
    }, [props.route.params.searched])

    return <></>
}

export default WorkerList
