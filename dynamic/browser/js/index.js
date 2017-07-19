import { actionCreators as testActions} from "features/test";
import reducers from "./reducer";
const {dispatch} = storelib.configureStore(reducers);
dispatch(testActions.makeTest())
