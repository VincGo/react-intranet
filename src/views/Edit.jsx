import React, {useEffect, useState} from 'react';
import Formulaire from "../components/Formulaire";
import {useHistory, useParams} from 'react-router-dom'
import PeopleService from "../PeopleService";
import {toast} from "react-toastify";

const Edit = () => {
    
    const { id } = useParams()
    const [person, setPerson] = useState();
    const history = useHistory()
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        PeopleService.fetchOne(id)
            .then((personData) => setPerson(personData))
    }, [id]);
    
    function editPerson (updatedPerson) {
        PeopleService.update(updatedPerson).then(({message}) => {
            toast.success(message)
            history.push('/list')
        }).catch(err => setErrorMsg(err.message))
    }
    
    return (
        <div className='container m-auto text-center'>
            <h1 className='text-5xl font-semibold mb-6 '>Modifier un collaborateur n°{id}</h1>
            <hr className='mt-4 mb-4'/>
            {errorMsg && <div className={"error"}>{errorMsg}</div>}
            {person && <Formulaire person={person} onValidation={editPerson}/>}
        </div>
    );
};

export default Edit;
