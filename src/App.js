import { service } from "./shared/service";
import { useService } from "@xstate/react";

function App() {
    const [state, send] = useService(service);

    return (
        <div className="app-container">
            {state.context.componentTree.map(({component: Component, children, props}) => 
                <Component components={children} {...props}/>
            )}
        </div>
    );
}

export default App;
