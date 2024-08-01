import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

:root {
--fff:#fff;
--active: #0832DE;
--bgButton : #4340DA
}

*,
*::before,
*::after {
margin: 0;
padding: 0;
box-sizing: border-box;
-webkit-font-smoothing: antialiased;
font-family: 'Public Sans';
}

li { list-style: none; }

a,
img,
data,
span,
input,
button,
select,
ion-icon,
textarea { display: block; }

a {
color: inherit;
text-decoration: none;
}

img { height: auto; }

input,
button,
select,
textarea {
background: none;
border: none;
font: inherit;
}

input,
select,
textarea {
width: 100%;
outline: none;
}

button {
cursor: pointer;
}

html {
scroll-behavior: smooth;
}

body,
h1,
h2,
h3,
p,
a {
margin: 0;
padding: 0;
color: inherit;
text-decoration: none;
}
`;

export default Global;
