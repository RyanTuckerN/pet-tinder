import React from 'react';

const Matches = (props) => {
  const {usersInfo} = props
console.log("MATCHES COMPONENT LOG", usersInfo.matches)
  return ( 
    <div>
      Hello from Matches!
    </div>
   );
}
 
export default Matches;