import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import { PackageCard } from './PackageCard';


//build REST api backend from which a user can create, delete and edit packages
let Packages = [
    { id: 1, name: 'Homebrew', script: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' },
    { id: 2, name: 'Gradle', script: 'brew install gradle' },
    { id: 3, name: 'Cask', script: 'brew install cask' },
    { id: 4, name: 'IntelliJ', script: 'brew install --cask intellij-idea' },
    { id: 5, name: 'Maven', script: 'brew install maven' },
    { id: 6, name: 'Docker', script: 'brew cask install docker' },
    { id: 7, name: 'Git', script: 'brew install git' },


]

function installPackages(basket){
    console.log("button clicked")
    console.log(basket)

    let fullScript = "#!/bin/bash \n"

    basket.forEach( (pack) => fullScript += (pack.script + '\n'))

    console.log(fullScript);

    const element = document.createElement("a");
    const file = new Blob([fullScript], {
        type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "mySetup.sh";
    document.body.appendChild(element);
    element.click();
}

export const Basket = () => {
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
           accept: 'package',
           drop: (item) => !basket.map(pack => pack.id).includes(item.id) ? (setBasket([...basket, item])) : undefined,
           collect: (monitor) => ({
                isOver: monitor.isOver()
           })
    })

    return (
        <React.Fragment>

            <div className="area">
                <div className='packages'>
                    <h2>Available Packages</h2>

                    <div className='packageItems'>
                        {Packages.map(pack => <PackageCard draggable key={pack.id} id={pack.id} name={pack.name} script={pack.script}/>)}
                    </div>

                </div>

                <div className='basket' ref={dropRef}>
                    <h2>Installation Zone</h2>

                    <div className='basketItems'>
                        { isOver ? <div className='dropSign'>Drop Here!</div> : basket.map(pack => <PackageCard key={pack.id} id={pack.id} name={pack.name} script={pack.script}/>)}
                    </div>

                    <div className='basketFooter'>
                        { basket.length == 0 ? <h3>Drag and drop packages here !</h3> : <> <button className="downloadScript" onClick={() => installPackages(basket)}>Download</button>  <button className="deleteAllButton" onClick={() => setBasket([])}>Reset <img width = "20" height = "20" src={require('./resources/trash-icon.png')} /></button> </>}
                        <button>Add custom commands</button>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )
}