import React, { useState } from 'react';
import './Modal.css'
import imagebtn from '../../static/img/image-add.png'
// import rebtn from '../../static/img/refresh.png'
import profile from '../../profileImg/8726390_user_icon.png'
const Modal = (props) => {
    



    const [Nickname, setNickname] = useState(null);
    const [status_msg, setStatusmsg] = useState(null);
    const [isreplace, setReplace] = useState(false);

    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	

    //console.log(storage)

    const { open, close, header, save } = props;

    const data = {
        nickname: Nickname,
        status_msg: status_msg
    }

    const readURL = (input) => {
        console.log(imgFile)
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('preview').src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            document.getElementById('preview').src = "";
        }
    }

    const handleChangeFile = (event ) => {
        console.log(event.target.files)
        setReplace(true)
        setImgFile(event.target.files);
        //fd.append("file", event.target.files)
        setImgBase64([]);
        for (var i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
                // 파일 상태 업데이트
                reader.onloadend = (e) => {
                    console.log(reader.result) //렌더 리절튼 

                    document.getElementById('preview').src = e.target.result;
                    // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                    const base64 = reader.result;
                    console.log(base64)
                    if (base64) {
                        //  images.push(base64.toString())
                        var base64Sub = base64.toString()

                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        //setImgBase64(newObj);
                        // 파일 base64 상태 업데이트
                        //console.log(images)
                        console.log(base64)

                    }
                }
            }
        }

    }



    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <div>
                            <img className="image" src={profile}
                                 style={{
                                     float: 'left',
                                     width: '100px',
                                     height: '100px',
                                     cursor: 'pointer',
                                     marginLeft: '20px'
                                 }}
                                 alt="any"></img>
                            {/*{isreplace === true &&*/}
                            {/*    <img*/}
                            {/*        onClick={() => { if (window.confirm("아직 업로드 되지 않았습니다 되돌리시겠습니까?")) setReplace(false); }}*/}
                            {/*        src={rebtn}*/}
                            {/*        style={{*/}
                            {/*            float: 'right',*/}
                            {/*            width: '30px',*/}
                            {/*            height: '30px',*/}
                            {/*            cursor: 'pointer',*/}
                            {/*            marginLeft: '20px'*/}
                            {/*        }}*/}
                            {/*    />}*/}
                            <label htmlFor="pic">
                                <img src={imagebtn} style={{
                                    float: 'right',
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer'
                                }} />
                            </label>
                            <input id="pic" type="file" multiple="multiple" accept='image/*'
                                onChange={handleChangeFile}
                                style={{
                                    position: 'absolute',
                                    width: '0',
                                    height: '0',
                                    padding: '0',
                                    margin: '-1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0, 0, 0, 0)',
                                    border: '0'
                                }} />
                        </div>
                        <br /><br />
                        <div>
                            <label>닉네임 : </label>
                            <input
                                type="text"
                                placeholder={props.data.nickname}
                                onChange={(event) => {
                                    setNickname(event.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>상태메세지  : </label>
                            <input
                                type="text"
                                placeholder={props.data.status_msg !== null ? props.data.status_msg : "현재 상태메세지가 없습니다"}
                                onChange={(event) => {
                                    setStatusmsg(event.target.value)
                                }}
                            />
                        </div>
                        <input type="file" id="file" onChange={handleChangeFile} multiple="multiple" />

                    </main>
                    <footer>
                        <button className="save" onClick={() => save(data)} >
                            save
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default Modal;