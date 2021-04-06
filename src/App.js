import { service } from "./shared/service";
import { useService } from "@xstate/react";

function App() {
    const [state, send] = useService(service);
    // Here we look at the componentTree from context and loop through it to render our components according to our state
    return (
        <div className="app-container">
            {state.context.componentTree.map(({component: Component, children, props}) => 
                <Component components={children} {...props}/>
            )}
        </div>
    );
}

export default App;
