
const CreatingStrengthsPage = () => {
    
    const handleTheseButonsExampleFunction = () => {
        alert("You continue from here");
    }

    return (
        <div>
            <div>
                <button onClick={handleTheseButonsExampleFunction}>Clifton Strengths</button>
            </div>
            <div>
                <button onClick={handleTheseButonsExampleFunction}>Gallup Strengths</button>
            </div>
        </div>
    )
}

export default CreatingStrengthsPage