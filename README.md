# C5 Toasts

This is simple library that I wanted to build. Definatly inspired by React-Toastify. I wanted to see
if I could build my own implementation using a PubSub design pattern. This has been an extremely fun
project. If you are looking for toasts in production, please use React-Toastify, but if you want to
see an extremely simple version of this implementation, feel free to check out the code. I am very new to Typescript so I will be enhancing as I learn more about it.

for Installation

```js
  npm install c5-toasts
```

or for yarn

```js
  yarn add c5-toasts
```

simple implementation

```js
import {ToastContainer, toast} from 'c5-toasts';

  const App = () => {

    const handleButtonClick = () => {
      toast.success('Hello I am a toast, 😎', {
        animation: 'flip'
      });
      toast.info('Here is some info'):
      toast.warning('Dont go there');
      toast.error('Something went wrong');
    }


    return (
      <div>
        <button onClick={handleClick}>Press me to see some toasts!</button>
        <ToastContainer />
      </div>
    )
  }
```

The ToastContainer can take in these props:

```js
<ToastContainer
  position="top-right"
  showLastOnTop={true}
  autoClose={true}
  autoCloseDelay={4000}
  showIcons={true}
  animation="zoom"
/>
```
