import React, {useEffect, useState} from 'react';
import Card from "../components/Card";
import PeopleService from "../PeopleService";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const List = () => {
    
    const [people, setPeople] = useState(null)
    const [searchText, setSearchText] = useState('');
    const [filterName, setFilterName] = useState("name");
    const history = useHistory()
    

    function onSearch (e) {
        setSearchText(e.target.value)
    }
    
    function changeFilter (e) {
        setFilterName(e.target.value)
    }
    
    const filterPeople = people?.filter(getFilter(filterName))
    
    function getFilter (filterName) {
        switch (filterName) {
            case 'name':
                return (person) => (person.firstname + ' ' + person.lastname).toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
            
            case 'location':
                return (person) => (person.city + ' ' + person.location).toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
            default: 
                return (person) => true
        }
    }
    
    function deletePerson ({id}) {
        PeopleService.remove(id)
            .then(({message}) => {
                toast.success(message)
                
                const newPeopleArray = people.filter(person => person.id !== id)
                setPeople(newPeopleArray)
            })
            .catch((err) => toast.error(err.message))
    }
    
    function editPerson ({id}) {
        history.push(`/edit/${id}`)
    }
    useEffect(() => {
        PeopleService.fetchAll().then((peopleData => setPeople(peopleData)))
    }, [])
    
    return (
        <div className={"container p-4 m-auto text-center"}>
            <h1 className={"text-5xl font-smibold mb-6"}>Liste des collaborateurs de l'intranet</h1>
            <hr className={"my-4"}/>
            
            <div className={"flex items-center justify-center p-3"}>
                <input type="search" className={"input w-96"} onInput={onSearch}/>
                <p className={"whitespace-nowrap m-3"}>Rechercher par :</p>
                <select className={"input w-48"} onChange={changeFilter}>
                    <option value="name">Nom</option>
                    <option value="location">Localisation</option>
                </select>
            </div>
            
            <div className={"mt-8 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"}>
                {!people && <p>LOADING ...</p>}
                {filterPeople && filterPeople.map(person => <Card  person={person} key={person.id} onDelete={deletePerson} onEdit={editPerson}/>)}
            </div>
        </div>
        
    );
};

export default List;
