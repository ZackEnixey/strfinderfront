
const CreatePlayerPage = () => {

    const routToAnotherPage = () => {
        alert("You continue from here");
    }

    return (
        <div>
            <div> Nickname </div>
            <div>
                <input />
            </div>
            <div> Email </div>
            <div>
                <input />
            </div>
            <div>
                <button onClick={routToAnotherPage}>next</button>
            </div>
        </div>
    )
}

export default CreatePlayerPage;