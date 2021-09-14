import DogDisplay from "../Profile/DogDisplay";

const Matches = (props) => {
  const { usersInfo } = props
  console.log(usersInfo)

  return ( 
    <div style={{display: 'flex', flexFlow: 'row-wrap', width: '80vw'}}>
      Hello from Matches!
      {usersInfo?.matches?.map(match=><DogDisplay dog={match} key={match.id} />)}
    </div>
   );
}
 
export default Matches;