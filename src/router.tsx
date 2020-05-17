import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/home-page'

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route path='/'>
					<HomePage />
				</Route>
			</Switch>
		</Router>
	)
}

export default AppRouter
