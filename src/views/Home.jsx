import React, {useEffect, useState} from 'react';
import Card from "../components/Card";
import PeopleService from "../PeopleService";

const Home = () => {

    const [people, setPeople] = useState(null)
    const [person, setPerson] = useState(null)

    useEffect(() => {
        PeopleService.fetchAll()
            .then((peopleData) => {
                setPeople(peopleData)
                setPerson(peopleData[Math.floor(Math.random() * peopleData.length)]);
            });
    }, [])
    
    function changePerson () {
        setPerson(people[Math.floor(Math.random() * people.length)]);
    }

    return (
        <div className='container m-auto text-center'>
            <h1 className='text-5xl font-semibold mb-6 '>Bienvenue sur l'intranet</h1>
            <p className='text-lg'>La plate-forme de l'entreprise qui vous permet de retrouver tous vos
                collaborateurs.</p>
            <hr className='mt-4 mb-4'/>

            <p className='text-xl mt-4 mb-2'>Avez-vous dit bonjour à ...</p>

            <div className='flex justify-center'>
                {person && <Card person = {person}/>}
            </div>
            {person && <button className="button rounded-lg" type={"button"} onClick={changePerson}> Dire bonjour à quelqu'un d'autre</button>}
        </div>
    );
};

export default Home;
