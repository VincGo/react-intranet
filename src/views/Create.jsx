import React, {useState} from 'react';
import Formulaire from "../components/Formulaire";
import PeopleService from "../PeopleService";
import {toast} from "react-toastify";
import {useHistory} from 'react-router-dom'

const Create = () => {
    
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState(null);

    function addPerson (data) {
        PeopleService
            .add(data)
            .then(({message}) => {
                toast.success(message)
                history.push('/list')
            }).catch((err) => setErrorMessage(err.message))
    }
    
    return (
        <div className={"container m-auto text-center"}>
            <h1 className={"text-5xl font-semibold mb-6"}>Ajouter un collaborateur</h1>
            <hr className={"my-4"}/>
            
            {errorMessage && <div className={'error'}>{errorMessage}</div>}
            <Formulaire onValidation={addPerson}/>
        </div>
    );
};

export default Create;