import { Button, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import React, { useEffect } from 'react'
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

const Step: React.FC = () => {

    // déclaration du slug
    let param = useParams()

    // déclaration BDD from api
    // * 1 BDD pages
    const [gameList, setGameList] = React.useState<any>('')
    useEffect(() => {
        fetch("http://192.168.1.250:1337/api/pages/" + param.step + "?populate=*")
            .then(response => response.json())
            .then(result => setGameList(result))
            .catch(error => console.log('error', error));
    }, []
    )
    // * 2 BDD rule
    const [rule, setRule] = React.useState<any>('')
    useEffect(() => {
        fetch("http://192.168.1.250:1337/api/rule")
            .then(response => response.json())
            .then(result => setRule(result))
            .catch(error => console.log('error', error));
    }, []
    )

    // * 3 BDD pages > answer
    // useEffect(() => {
    //     fetch("http://192.168.1.250:1337/api/pages/1")
    //         .then(response => response.json())
    //         .then(result => setAnswerApi(result))
    //         .catch(error => console.log('error', error));
    // }, []
    // )
    // const [answerApi, setAnswerApi] = React.useState<any>('')


    // console.log(gameList.data.attributes.step);


    const handleShowAnswerForm = (event: any) => {
        event.preventDefault();
        if (event.target.elements.answer.value == gameList.data.attributes.answer) {
            setGoodAnswer(true);
        } else {
            setGoodAnswer(false);
        }
        setShowAnswerForm(true)
    }

    // console.log(gameList && gameList.data.attributes.step);


    // déclaration des booliens. attente factorisation
    const [step1, setStep1] = React.useState<boolean>(true)
    const [step2, setStep2] = React.useState<boolean>(false)
    const [stepRule, setStepRule] = React.useState<boolean>(false)
    const [step3, setStep3] = React.useState<boolean>(false)
    const [stepGameStory, setStepGameStory] = React.useState<boolean>(false)
    const [showAnswerForm, setShowAnswerForm] = React.useState<boolean>(false);
    const [goodAnswer, setGoodAnswer] = React.useState<boolean>(false)

    const handleClose = () => setShowAnswerForm(false)
    const handleCloseRule = () => setStepRule(false)
    const handleCloseRuleGame = () => setStepGameStory(false)

    // fonction des booliens
    const startGame = () => {
        setStep1(false)
        setStep2(true)
    }
    const showIntro = () => {
        setStepRule(true)
    }
    const imgGame = () => {
        setStepRule(false)
        setStepGameStory(true)
    }
    const gameLauncher = () => {
        setStep3(true)
        setStep2(false)
        setStepRule(false)
        setStepGameStory(false)
    }

    return (
        <>
            {/* élément 1 */}
            <Container fluid>
                <Row>
                    <Col xs={12} className="gif-orientation text-center">
                        <Image src="/src/assets/images/turnscreen.gif" alt="" />
                        <h2 className="title">
                            Pour commencer, <br />
                            veuillez pivoter en portrait
                        </h2>
                    </Col>
                </Row>
            </Container>
            {/* élément 2 */}
            {step1 &&
                <Container fluid className='vh-100 main only-portrait'>
                    <Row className="bg p-4">
                        <Col xs={12} className='text-center '>
                            <h2 className="title">
                                Le trésor du legéndaire <br />
                                pirate la buse
                            </h2>
                            <Button onClick={() => startGame()} variant='' className="btn step-btn"><div className="text">{gameList && gameList.data.attributes.title}</div></Button>
                            <div className="text text-end step-text"> {gameList && gameList.data.attributes.step}</div>
                        </Col>
                    </Row>
                </Container>
            }
            {/* élément 3 */}
            {/* affichage de deux choix rappel des règles ou Jeu  */}
            {step2 &&
                <Container fluid className='only-portrait main'>
                    <Row>
                        <Image className='char-img' src="/src/assets/images/char2.png" alt="" />
                        <div className='text-center char-text bg'>
                            <h2 className='title'>Salut moussaillon !!</h2>
                            {/* <div className="text">lor</div> */}
                            <Button onClick={() => showIntro()} variant='' className='text-center mx-2 px-5 step-btn'>
                                <div className="text">Règles de l'événement</div>
                            </Button> <br />
                            <Button onClick={() => imgGame()} variant='' className='text-center mx-2 px-5 step-btn mt-2'>
                                <div className="text">Jouer</div>
                            </Button>
                        </div>
                    </Row>
                </Container>
            }
            {/* élément 4 */}
            {/* affichage de la règle de l'événement  */}
            {stepRule &&
                <Modal show={stepRule} onHide={handleCloseRule} centered>
                    <Modal.Header closeButton className="bg">
                        <Modal.Title><div className="text-bold text-center">Règles de l'événement</div> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center white-bg px-4 py-3">
                            <div className="text text-justify">{rule && parse(rule && rule.data.attributes.text)}</div>
                            {/* <Button onClick={() => imgGame()} variant='' className="btn step-btn px-5"><div className="text">Poursuivre l'histoire</div></Button> */}
                        </div>
                    </Modal.Body>
                </Modal>
            }
            {/* affichage de l'histoire de l'étape de l'énigme */}
            {stepGameStory &&
                <Modal show={stepGameStory} onHide={handleCloseRuleGame} centered>
                    <Modal.Header closeButton className="bg">
                        <Modal.Title><div className="text-bold">{gameList && gameList.data.attributes.title}</div> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center white-bg px-4 py-3">
                            <div className="text text-justify">{gameList && parse(gameList.data.attributes.content)}</div>
                            <Button onClick={gameLauncher} variant='' className="btn step-btn px-5"><div className="text">Continuer</div></Button>
                        </div>
                    </Modal.Body>
                </Modal>
            }
            {/* élément 5 */}
            {/* affichage du jeu + règle du jeu */}
            {step3 &&
                <Container fluid className='only-portrait main bg'>
                    <Row>
                        <Col className='text-center'>
                            <h2 className="title">Règles du Jeu</h2>
                            {/* règle de l'énigme  */}
                            <div className="text">{gameList && parse(gameList.data.attributes.rules_games)}</div>
                            {/* image de l'énigme  */}
                            <Image className='game-img' src={'http://192.168.1.250:1337' + gameList.data.attributes.game.data[0].attributes.url} /> <br />
                            {/* formulaire de validation de la réponse */}
                            <Form id='answer-form' className='p-4 ' onSubmit={handleShowAnswerForm}>
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    {/* <Form.Label>Text</Form.Label> */}
                                    <Form.Control type="text" placeholder="Saisissez votre réponse" name="answer" required />
                                </Form.Group>
                                <Button variant="btn-stp" type="submit" className='step-btn'>
                                    Valider
                                </Button>
                            </Form>
                            <Modal show={showAnswerForm} onHide={handleClose} centered>
                                <Modal.Header closeButton className="bg">
                                    <Modal.Title><div className="text-bold"> {goodAnswer ? <>Félicitations</> : <>Oups</>}</div> </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="text text-center">
                                        {goodAnswer ?
                                            <>
                                                <div className="text-justify">C'est bien la bonne réponse.<br /> Veuillez enregistrer votre progression dans le jeu en cliquant sur :</div>
                                                < Button variant="" className="step-btn py-2 my-3" onClick={handleClose}>
                                                    Enregistrer ma progression
                                                </Button>
                                            </>
                                            :
                                            <>
                                                <div className="text-justify">Ce n'est pas la bonne réponse. <br /> Veuillez : <br /></div>
                                                < Button variant="" className="step-btn py-2 my-3" onClick={handleClose}>
                                                    Réessayer
                                                </Button>
                                            </>
                                        }
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}


export default Step
