import React, {useEffect, useState, Suspense} from 'react';
import {Container, Grid, Box} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Loader from "./components/Loader/Loader";
import ImgLogoAll from './assets/image/logo-all.png';
import ImgLogoStarWars from './assets/image/logo-StarWars.png';
import ImgLogoGoT from './assets/image/logo-GoT.png';
import CircularProgress from "@material-ui/core/CircularProgress";
import UniverseSelectLogo from "./components/UniverseLogo";
import Intro from "./components/Intro/Intro";
import CharacterList from "./components/CharacterList";

function App() {
    const classes = useStyles();
    const [universe, setUniverse] = useState(null);
    const [universeName, setUniverseName] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [soundEffects] = useState({
        starwars: [
            typeof Audio !== "undefined" && new Audio('/sound/R2-happy-confirmation.mp3'),
            typeof Audio !== "undefined" && new Audio('/sound/R2-happy-three-chirp.mp3'),
            typeof Audio !== "undefined" && new Audio('/sound/R2-pulling-it-together.mp3')
        ],
        GoT: [
            typeof Audio !== "undefined" && new Audio('/sound/GOT-winter-is-coming.mp3'),
            typeof Audio !== "undefined" && new Audio('/sound/GOT-better-with-wine.mp3'),
            typeof Audio !== "undefined" && new Audio('/sound/GOT-meaning-of-this.mp3'),
            typeof Audio !== "undefined" && new Audio('/sound/GOT-possibilities.mp3'),
            typeof Audio !== "undefined" && new Audio('/sound/GOT-your-command.mp3')
        ]
    })
    useEffect(() => {
        getCharacters();
    }, [universe]);
    useEffect(() => {
        if (window.timerSearchQuery)
            clearTimeout(window.timerSearchQuery);
        window.timerSearchQuery = setTimeout(() => {
            getCharacters();
        }, 1500);
    }, [searchQuery]);
    const playRandomSound = u => {
        if (soundEffects[u])
            soundEffects[u][Math.floor(Math.random() * soundEffects[u].length)].play()
    }
    const selectUniverse = (u, uName) => {
        playRandomSound(u);
        setUniverse(u);
        setUniverseName(uName ? uName : u);
    };
    const getCharacters = () => {
        if (universe !== null) {
            let url;
            if (searchQuery.length) {
                url = `http://localhost:8080/people/?universe=${universe}&${url}&name=${searchQuery}`
            } else {
                url = `http://localhost:8080/people/?universe=${universe}`;
            }
            setLoading(true);
            axios(url).then(resp => {
                console.log('resp.data', resp.data);
                setCharacters(resp.data);
            }).catch(error => {
                console.log('Error fetching characters: ', error);
                setError(error);
            }).finally(() => {
                setLoading(false);
            })
        }
    };
    return (
        <Suspense fallback={<Loader/>}>
            <Container maxWidth="sm">
                <Grid container
                      alignItems={'center'}
                      justifyContent={'center'}
                      style={{minHeight: "100vh"}}>
                    <Grid item xs='auto'>
                        <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                            <UniverseSelectLogo
                                className={universe === 'all' ? `${classes.logoImage} ${classes.logoActive}` : classes.logoImage}
                                src={ImgLogoAll}
                                onClick={() => {
                                    selectUniverse('all', 'All Universes')
                                }}/>
                            <UniverseSelectLogo
                                className={universe === 'starwars' ? `${classes.logoImage} ${classes.logoActive}` : classes.logoImage}
                                src={ImgLogoStarWars}
                                onClick={() => {
                                    selectUniverse('starwars', 'Star Wars')
                                }}/>
                            <UniverseSelectLogo
                                className={universe === 'GoT' ? `${classes.logoImage} ${classes.logoActive}` : classes.logoImage}
                                src={ImgLogoGoT}
                                onClick={() => {
                                    selectUniverse('GoT');
                                }}/>
                        </Box>
                        {error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        )}
                        {universe === null ? (
                            <Intro/>
                        ) : loading ? (
                            <div className={classes.progressWrapper}>
                                <CircularProgress className={classes.progress} color="secondary"/>
                            </div>
                        ) : (
                            <CharacterList characters={characters} selectUniverse={selectUniverse}
                                           universeName={universeName}
                                           searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Suspense>
    );
}

const useStyles = makeStyles((theme) => ({
    progressWrapper: {
        width: '100%',
        textAlign: 'center',
        padding: 25
    },
    progress: {
        color: '#20587f',
    },
    logoImage: {
        cursor: 'pointer',
        maxWidth: 200,
        padding: 10
    },
    logoActive: {
        border: '2px solid yellow'
    }
}));
export default App;
