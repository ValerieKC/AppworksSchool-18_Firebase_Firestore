// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot
} from "firebase/firestore";
import { useEffect, useRef } from "react";
import styled from "styled-components";
const authorId = "valerieKC"

const firebaseConfig = {
  apiKey: "AIzaSyDJdAP5KZ8_JT2VOTMW-SfYZ5qdvBWEZXQ",
  authDomain: "group1firebase.firebaseapp.com",
  projectId: "group1firebase",
  storageBucket: "group1firebase.appspot.com",
  messagingSenderId: "309095361867",
  appId: "1:309095361867:web:15a221ec650cb0e2e84cce",
  measurementId: "G-R9EYYQXQ04",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Container = styled.div`
  margin: 0 auto;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 500px;
  border: 4px solid #2c698d;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const TitleInput = styled.input.attrs({
  type: "input",
})`
  width: 300px;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const TagInput = styled.input.attrs({
  type: "radio",
})`
  border-radius: 8px;
  border: solid 1px #979797;
  
`;

const Label = styled.label`
  color: #3f3a3a;
`

const ContentInput = styled.textarea.attrs({
  type: "textarea",
})`
  width: 300px;
  height: 200px;
  border-radius: 8px;
  border: solid 1px #979797;
  line-height: normal;
`;

const SubmitBtn = styled.button.attrs({
  value: "submit",
})`
  width: 80px;
  height:20px;
`;
const InputGroup = styled.div`
display:flex;
width:400px;
display:flex;
justify-content:space-between;
`

const FormLabel = styled.label`
  width: 80px;
  line-height: 20px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;
`

function MyFireStoreApp() {
  const inputTitleRef = useRef();
  const inputContentRef = useRef();
  const inputTagRef = useRef();
  const timestamp = new Date();

  async function PostData() {
    try {
      const docRef = await addDoc(collection(db, "Articles"), {
        title: inputTitleRef.current.value,
        content: inputContentRef.current.value,
        tag: inputTagRef.current.value,
        author_id: authorId,
        created_time: timestamp,
      });
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const snapshot = onSnapshot(collection(db, "group1"), (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id});
       
      });
       posts.forEach((doc) => {
         console.log({
           id: doc.id,
           title: doc.title,
           content: doc.content,
           tag: doc.tag,
           author_id: doc.author_id,
           created_time: new Date(doc.created_time.seconds * 1000),
         });
       });
    });
    //cleanup
    return () => {
      snapshot();
    };
  }, []);


  return (
    <Container>
      <Wrapper>
        <InputGroup>
          <FormLabel>Title:</FormLabel>
          <TitleInput ref={inputTitleRef} onChange={() => {}} />
        </InputGroup>
        <InputGroup>
          <FormLabel>Tag:</FormLabel>
          <TagInput
            ref={inputTagRef}
            onClick={(event) => {
              inputTagRef.current = event.target;
            }}
            value={`Beauty`}
          />
          <Label>Beauty</Label>
          <TagInput
            ref={inputTagRef}
            onClick={(event) => {
              inputTagRef.current = event.target;
            }}
            value={`Gossiping`}
          />
          <Label>Gossiping</Label>
          <TagInput
            ref={inputTagRef}
            onClick={(event) => {
              inputTagRef.current = event.target;
            }}
            value={`SchoolLife`}
          />
          <Label>SchoolLife</Label>
        </InputGroup>
        <InputGroup>
          <FormLabel>Content:</FormLabel>
          <ContentInput ref={inputContentRef} onChange={() => {}} />
        </InputGroup>
        <InputGroup>
          <FormLabel></FormLabel>
          <SubmitBtn onClick={PostData}>Submit</SubmitBtn>
        </InputGroup>
      </Wrapper>
    </Container>
  );
}

export default MyFireStoreApp;
