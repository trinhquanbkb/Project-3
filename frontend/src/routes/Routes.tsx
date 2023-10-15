import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// All layouts containers
import DefaultLayout from "../layouts/Default";

import {
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
} from "./index";
import HorizontalLayout from "../layouts/Horizontal";

interface RoutesProps {}

const Routes = (props: RoutesProps) => {
	const { layout } = useSelector((state: RootState) => ({
		layout: state.Layout,
	}));

	let Layout = HorizontalLayout;

	return (
		<BrowserRouter>
			<Switch>
				<Route
					path={publicProtectedFlattenRoutes.map(
						(r: any) => r["path"]
					)}
				>
					<DefaultLayout {...props} layout={layout}>
						<Switch>
							{publicProtectedFlattenRoutes.map(
								(route: any, index: number) => {
									return (
										!route.children && (
											<route.route
												key={index}
												path={route.path}
												roles={route.roles}
												exact={route.exact}
												component={route.component}
											/>
										)
									);
								}
							)}
						</Switch>
					</DefaultLayout>
				</Route>

				<Route
					path={authProtectedFlattenRoutes.map((r: any) => r["path"])}
				>
					<Layout {...props}>
						<Switch>
							{authProtectedFlattenRoutes.map(
								(route: any, index: number) => {
									return (
										!route.children && (
											<route.route
												key={index}
												path={route.path}
												roles={route.roles}
												exact={route.exact}
												component={route.component}
											/>
										)
									);
								}
							)}
						</Switch>
					</Layout>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
