import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Draggable from 'react-draggable';
import axios from 'axios';
import html2canvas from 'html2canvas';
import MemesDisplay from './MemeDisplay';

function MemeComponent() {
    const inputRef = useRef();
    const captureRef = useRef(null);
    const [text, setText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCancel = () => {
        inputRef.current.value = null;
        setSelectedFile(null);
    };

    const handleGenerateMeme = async () => {
        if (!selectedFile || !captureRef.current) return;

        try {
            const canvas = await html2canvas(captureRef.current);
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('image', blob, 'meme.png');
                formData.append('text', text);

                try {
                    await axios.post('https://memestudioserver.onrender.com/addmeme', formData);
                    alert('Meme uploaded successfully!');
                } catch (error) {
                    console.error(error);
                }
            });
        } catch (error) {
            console.error('Error generating meme:', error);
        }
    };

    const handleDownloadMeme = async () => {
        if (!selectedFile || !captureRef.current) return;

        try {
            const canvas = await html2canvas(captureRef.current);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'meme.png';
            link.click();
        } catch (error) {
            console.error('Error downloading meme:', error);
        }
    };

    return (
        <div style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {selectedFile && (
                    <div>
                        <h3>Ajouter du texte</h3>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Entrer votre texte"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{
                                marginTop: 15,
                                borderRadius: 10,
                                padding: 10,
                                border: '1px solid orange',
                                width: 300,
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 600,
                                color: 'black',
                                backgroundColor: 'white',
                                fontFamily: 'cursive',
                                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    </div>
                )}
            </div>

            <div
                ref={captureRef}
                style={{
                    position: 'relative',
                    width: '25%',
                    height: 380,
                    borderWidth: 1,
                    borderColor: 'orange',
                    borderStyle: 'solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: 20,
                    backgroundColor: 'white',
                    marginTop: 25,
                }}
            >
                {!selectedFile && (
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type="file" onChange={handleFileChange} />
                        </form>
                    </div>
                )}
                {selectedFile && (
                    <div style={{ position: 'relative' }}>
                        <div ref={captureRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <img className='image' src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: '100%', objectFit: 'contain' }} />
                            <Draggable>
                                <div style={{
                                    position: 'absolute',
                                    top: `${textPosition.y}px`,
                                    left: `${textPosition.x}px`,
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '2.5rem',
                                    fontFamily: 'revert',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}>
                                    {text}
                                </div>
                            </Draggable>
                        </div>
                    </div>
                )}
            </div>

            {selectedFile && (
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', }}>
                    <Button style={{marginRight:15}} variant="primary" onClick={handleGenerateMeme} size="sm">Générer meme</Button>
                    <Button style={{marginLeft:15}} variant="secondary" onClick={handleDownloadMeme} size="sm">Télécharger meme</Button>
                </div>
            )}

            <section
                style={{
                    width: '100%',
                    marginTop: 25
                }}
            >
                <h3 style={{
                    width: '100%',
                    backgroundColor: 'black',
                    color: 'white',
                    justifySelf: 'center'
                }}
                >Memes Gallery</h3>
                <MemesDisplay />
            </section>
        </div>
    );
}

export default MemeComponent;
