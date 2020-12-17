import {useState, useEffect} from 'react';

//Filereader to read the file in array buffer form
// const FileReader = require('filereader')

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const Home = ({instance, account}) => {

    //State 
    const [array, setArray] = useState();
    const [image, setImage] = useState('');

    //UseEffect

    useEffect (()=> {
        loadImage();
    })


    const loadImage = async() => {
        const file = await instance.methods.hash().call();
        setImage("https://ipfs.io/ipfs" + file);
    }
    //Handlers
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const file = await ipfs.add(array);
        console.log("Submitting....", file);
        const result = await instance.methods.setHash(file.path).send({from: account});
        console.log(result);
        const hash = await instance.methods.hash().call();
        console.log(hash);
        setImage("https://ipfs.io/ipfs/" + hash);
    }

    const onFileSelectHandler = async(e) => {
        e.preventDefault();
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onloadend = async() => {
            const file = await Buffer(reader.result);
            console.log(file);
            setArray(file);
        }
        //setArray(reader.result);
        console.log(e.target.files);
    }
    return(
        <div className="home">
            <div className="title">
                <h1>Please upload your image below.</h1>
            </div>
            <div className="image">
                <img src= {image} alt="Uploadedimage"/>
            </div>
            <div className="form">
                <form className="options">
                    <input type="file" onChange={onFileSelectHandler} />
                    <input type="submit" onClick = {onSubmitHandler} />
                </form>
            </div>
        </div>
    );
}

export default Home;