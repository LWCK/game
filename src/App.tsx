import './App.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import React, { useEffect } from 'react'
import parse from 'html-react-parser';

const App = () => {

	const [gameList, setGameList] = React.useState<any>('')
	useEffect(() => {
		fetch("http://192.168.1.250:1337/api/pages?populate=*")
			.then(response => response.json())
			.then(result => setGameList(result))
			.catch(error => console.log('error', error));
	}, []
	)


	const [rule, setRule] = React.useState<any>('')
	useEffect(() => {
		fetch("http://192.168.1.250:1337/api/rule")
			.then(response => response.json())
			.then(result => setRule(result))
			.catch(error => console.log('error', error));
	}, []
	)

	console.log(gameList && gameList.data[1].attributes.game.data[0].attributes.url);
	// console.log(rule && rule.data.attributes.text);

	const [step1, setStep1] = React.useState<boolean>(true)
	const [step2, setStep2] = React.useState<boolean>(false)
	const [stepRule, setStepRule] = React.useState<boolean>(false)
	const [step3, setStep3] = React.useState<boolean>(false)
	const [stepGameStory, setStepGameStory] = React.useState<boolean>(false)

	const startGame = () => {
		setStep1(false)
		setStep2(true)
	}

	const showIntro = () => {
		setStepRule(true)
		setStep2(false)
	}

	const imgGame = () => {
		setStep2(false)
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

			<Container>
				<Row>
					<Col xs={12} className="gif-orientation text-center">
						<Image src="/src/assets/images/turnscreen.gif" alt="" />
						<h2 className="title">
							Pour commencer, <br />
							veuillez pivoter le téléphone
						</h2>
					</Col>
				</Row>
			</Container>

			{step1 &&

				<Container className='vh-100 main only-portrait'>
					<Row className="bg p-4">
						<Col xs={12} className='text-center '>
							<h2 className="title">
								Le trésor du legéndaire <br />
								pirate la buse
							</h2>
							<Button onClick={() => startGame()} variant='' className="btn text">Commencer le jeu</Button>
						</Col>
					</Row>
				</Container>
			}
			{
				step2 &&
				<>
					<Container className='only-portrait main p-5 '>
						<Row>
							<Image className='char-img-2' src="/src/assets/images/char2.png" alt="" />
							<div className='text-center char-text bg title'>
								<h2>Salut moussaillon !!</h2>
								<Button onClick={() => showIntro()} variant='' className='text-end'>
									Rappel des règles
								</Button>
								<Button onClick={() => imgGame()} variant='' className='text-end'>
									jeu
								</Button>
							</div>
						</Row>
					</Container>
				</>
			}
			{stepRule &&
				<>
					<Container fluid className='main2 only-portrait bg'>
						<Row className="p-3">
							<Col xs={12} className='text text-justify text'>
								{rule && parse(rule && rule.data.attributes.text)}
								<Button onClick={() => imgGame()} variant='' className="btn text">Commencer l'histoire
								</Button>
							</Col>
						</Row>
					</Container>
				</>
			}
			{stepGameStory &&
				<Container fluid className='main2 only-portrait bg'>
					<Row className="p-3">
						<Col xs={12} className='text text-justify text'>
							{gameList && parse(gameList.data[1].attributes.content)}
							<Button onClick={() => gameLauncher()} variant='' className="btn text">Commencer l'énigme
							</Button>
						</Col>
					</Row>
				</Container>
			}
			{
				step3 &&
				<Container className='only-portrait main bg'>
					<Row>
						<Col className='text-center'>
							<h2>Règles du Jeu</h2>
							{gameList && parse(gameList.data[1].attributes.rules_games)}
							<Image className='game-img' src={'http://192.168.1.250:1337' + gameList.data[1].attributes.game.data[0].attributes.url} />
						</Col>
					</Row>
				</Container>
			}
		</>
	)
}


export default App
