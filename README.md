# Admin Dashboard

Take-home project for fun. Demo here: https://admin-dashboard-git-master-jamesevans.vercel.app/ \
Displays a list of employees and allows the user to modify the details of an employee, add a new employee, and sort by department. 


## Available Scripts

To get started, run:

#### `npm install`
#### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To build the app for production to the `build` folder, run:

#### `npm run build`

## Styles
To speed up the dev process, I brought in Bootstrap for it's utility classes and mixins. 
Aside from that I setup some custom base styles found in https://github.com/James-revans/admin-dashboard/tree/master/src/shared/styles

## State
I leveraged xstate to manage state across the app. This manages rendering the views, modal popups, and tracking global state.
xstate is a state machine library https://xstate.js.org/docs/ that helps to visualize the flow of your app better, and to make each state bulletproof. The configs for this can be found here: https://github.com/James-revans/admin-dashboard/tree/master/src/shared/machines

### Example state machine showing a promise resolve
This is straight from the xstate docs here: https://xstate.js.org/docs/guides/start.html
As you can see, you can follow the state tree through the lifecycle of a promise. 

```JavaScript
import { Machine } from 'xstate';

const promiseMachine = Machine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'rejected'
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      type: 'final'
    }
  }
});

```


## Modals
I setup a system for invoking modals on the page. This can be seen here: https://github.com/James-revans/admin-dashboard/blob/master/src/shared/machines/modal.partial.js

After importing your service into your component, all you need to do to send an event it run:

```JavaScript
send("EVENT_NAME")
```

An example of this can be seen when we click the "Add Employee" button: https://github.com/James-revans/admin-dashboard/blob/master/src/views/home/Home.view.jsx
```HTML
<button onClick={() => {send("MODAL_ADD_EMPLOYEE")}}>
    Add Employee
</button>
```

To close the modal, all you need to do is send the `"MODAL_CLOSE"` event: https://github.com/James-revans/admin-dashboard/blob/master/src/shared/components/modal/Modal.jsx
```HTML
<button onClick={() => {send("MODAL_CLOSE")}}>
  Close modal
</button>
```

## Testing
All testing so far has been manual with multiple browsers and devices. Test integrations with Jest would be the next step.

## Features to come
Testing with Jest\
Routing with url params setup for each modal popup\
Animations for each employee card\
Make use of the loading state that is already setup
