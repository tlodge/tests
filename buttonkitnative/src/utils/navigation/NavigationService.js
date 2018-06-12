import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    console.log("set the top level naviagtor!!");
    _navigator = navigatorRef;
    console.log(_navigator);
}

function navigate(routeName, params) {
    console.log(_navigator);
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
};