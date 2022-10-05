// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import {
  collection,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
const authorId = "valerie";

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

const Style = createGlobalStyle`
  body, html {
    height: 100%;
    background: #dee0e6;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const Container = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
`;
const Header = styled.div`
  width: 100vw;
  height: 100px;
  background-color: #134e6f;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  padding: 40px;
  width: 500px;
  background-color: #ffa822;
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

const SearchGroup = styled.div`
  height: 100%;
  margin: 20px;
  display: block;
  width: 200px;
  font-size: 14px;
`;
const SearchInputPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchInput = styled.input.attrs({
  type: "input",
})`
  width: 120px;
  border: solid 1px #979797;
`;

const SearchBtn = styled.button.attrs({
  value: "submit",
})`
  width: 80px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowSearchPanel = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f0f0;
`;

const ShowSearchTitle = styled.div``;

const ShowSearchResult = styled.div`
  width: 180px;
  height: auto;
  text-align: center;
`;

const AddFriendBtn = styled.button.attrs({
  value: "submit",
})`
  width: 80px;
  height: 20px;
  display: ${({ props }) => (props ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
const UserMessagePanel = styled.div`
  width: 100%;
  display: block;
  padding-top: 5px;
`;

const UserMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

const AcceptBtn = styled.button.attrs({ value: "submit" })`
  width: 80px;
  height: 20px;
`;

const TagInput = styled.input.attrs({
  type: "radio",
})`
  border-radius: 8px;
  border: solid 1px #979797;
`;

const Label = styled.label`
  color: #3f3a3a;
`;

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
  height: 20px;
`;
const InputGroup = styled.div`
  display: flex;
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const FormLabel = styled.label`
  width: 80px;
  line-height: 20px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;
`;

const FriendListPanel = styled.div`
  height: 100%;
  margin: 20px;
  display: block;
  width: 200px;
  font-size: 14px;
`;

const FriendListTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const FriendsList = styled.div``;
const FriendEachList = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  padding-top: 5px;
  border: 2px solid #f7f0f0;
  border-radius: 8px;
`;

function MyFireStoreApp() {
  const inputTitleRef = useRef();
  const inputContentRef = useRef();
  const inputTagRef = useRef();
  const inputSearchRef = useRef("");
  const timestamp = new Date();
  const [searchUser, setSearchUser] = useState("");
  const [addFriendState, setAddFriendState] = useState([]);
  const [responseState, setResponseState] = useState([]);
  const [friendState, setFriendList] = useState([]);
  const MyAccount = {
    email: "valerie81.wang@gmail.com",
    id: "valerie",
    name: "KCWang",
  };
  const tag = [
    {0: "Beauty"},
    {1: "Gossiping"},
    {2: "SchoolLife"}
];

  async function PostData() {
    try {
      const getIdRef = doc(collection(db, "Articles"));
      const docRef = await setDoc(doc(db, "Articles", getIdRef.id), {
        id: getIdRef.id,
        title: inputTitleRef.current.value,
        content: inputContentRef.current.value,
        tag: Number(inputTagRef.current.value),
        author_id: authorId,
        created_time: timestamp,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //監聽文章即時更新，編輯其他功能中先comment掉
  useEffect(() => {
    const snapshot = onSnapshot(collection(db, "Articles"), (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
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

  async function SearchFriends() {
    if (!inputSearchRef.current.value.trim()) {
      return;
    }
    try {
      const getFriend = await getDoc(
        doc(db, "Users", inputSearchRef.current.value.trim())
      );
      // console.log(getFriend.data());
      // setSearchUser(getFriend?.data() ? getFriend.data().name : "查無此用戶");

      const result = tag.find((e,index) => {
        // console.log(typeof String(Object.values(e)));
        if (inputSearchRef.current.value.trim() === String(Object.values(e))) {
          return index
        }
      });

      console.log(result[0])

      // const tagList = collection(db, "Articles");
      // const q = query(
      //   tagList,
      //   where("tag", "==", Number(inputSearchRef.current.value.trim()))
      // );
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });
    } catch (e) {
      console.error("Search Friend Failed: ", e);
    }
  }

  // async function SearchTag() {
  //   const tagList = collection(db, "Articles");
  //   const q = query(
  //     tagList,
  //     where("tag", "==", inputSearchRef.current.value.trim())
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc);
  //   });
  // }

  //////// FireStore的Search功能
  // const userList = collection(db, "Users");
  //     const q = query(userList, where("email", "==", inputSearchRef.current.value.trim()));
  //     const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {
  //         setSearchUser(doc.data().name)
  //       })

  async function SendFriendRequest() {
    try {
      if (!inputSearchRef.current.value) return;
      // const getRequest = await getDoc(
      //   doc(db, "Invitation", inputSearchRef.current.value)
      // );
      // const requestedData = getRequest.data().request;

      await updateDoc(doc(db, "Invitation", inputSearchRef.current.value), {
        request: arrayUnion(MyAccount),
      });
    } catch (e) {
      console.error("Error SendFriendRequest(): ", e);
    }
  }

  // 監聽加好友訊息
  useEffect(() => {
    const snapshot = onSnapshot(
      doc(db, "Invitation", "valerie81.wang@gmail.com"),
      (snapshot) => {
        const invitationData = snapshot.data();
        invitationData?.request.map((doc) => {
          console.log(doc.name, "add you friend!");
        });
        setAddFriendState(invitationData.request || []);
        setResponseState(invitationData.response || []);
      }
    );
    //cleanup
    return () => {
      snapshot();
    };
  }, []);

  async function AcceptFriend(user, index) {
    try {
      await updateDoc(doc(db, "Invitation", "valerie81.wang@gmail.com"), {
        request: arrayRemove(user),
      });
      await updateDoc(doc(db, "Invitation", user.email), {
        response: arrayUnion(MyAccount),
      });
      await updateDoc(doc(db, "Users", "valerie81.wang@gmail.com"), {
        friends: arrayUnion(user),
      });
    } catch (e) {
      console.error("Error AcceptFriend(): ", e);
    }
  }

  async function AcceptResponse() {
    try {
      const getfriends = await getDoc(
        doc(db, "Invitation", "valerie81.wang@gmail.com")
      );
      const responseId = getfriends.data().response;
      const newResponseId = [...responseId];

      await updateDoc(doc(db, "Invitation", "valerie81.wang@gmail.com"), {
        response: arrayRemove(...newResponseId),
      });

      await updateDoc(doc(db, "Users", "valerie81.wang@gmail.com"), {
        friends: arrayUnion(...newResponseId),
      });
    } catch (e) {
      console.error("Error AcceptResponse(): ", e);
    }
  }

  useEffect(() => {
    if (responseState.length === 0 ) return;
    AcceptResponse();
  }, [responseState]);

  useEffect(() => {
    const snapshot = onSnapshot(
      doc(db, "Users", "valerie81.wang@gmail.com"),
      (snapshot) => {
        const friendList = snapshot.data().friends;
        setFriendList(friendList || []);
      }
    );
    //cleanup
    return () => {
      snapshot();
    };
  }, []);

  return (
    <>
      <Header></Header>
      <Container>
        <SearchGroup>
          <SearchInputPanel>
            <SearchInput ref={inputSearchRef} onChange={() => {}} />
            <SearchBtn onClick={SearchFriends}>搜尋</SearchBtn>
          </SearchInputPanel>
          <ShowSearchPanel>
            <ShowSearchTitle>搜尋用戶結果:</ShowSearchTitle>
            <ShowSearchResult>{searchUser}</ShowSearchResult>
            <AddFriendBtn
              onClick={SendFriendRequest}
              props={inputSearchRef.current.value}
            >
              加好友
            </AddFriendBtn>
          </ShowSearchPanel>
          <UserMessagePanel>
            {addFriendState.map((user, index) => {
              return (
                <UserMessage key={user.id}>
                  {`${user.name} send you a request!`}
                  <AcceptBtn
                    onClick={() => {
                      AcceptFriend(user, index);
                    }}
                  >
                    Accept
                  </AcceptBtn>
                </UserMessage>
              );
            })}
          </UserMessagePanel>
        </SearchGroup>
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
              value={0}
            />
            <Label>Beauty</Label>
            <TagInput
              ref={inputTagRef}
              onClick={(event) => {
                inputTagRef.current = event.target;
              }}
              value={1}
            />
            <Label>Gossiping</Label>
            <TagInput
              ref={inputTagRef}
              onClick={(event) => {
                inputTagRef.current = event.target;
              }}
              value={2}
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
        <FriendListPanel>
          <FriendListTitle>好友列表</FriendListTitle>
          <FriendsList>
            {friendState.map((friend, index) => {
              return (
                <FriendEachList key={`${index}-${friend.name}`}>
                  {friend.name}
                </FriendEachList>
              );
            })}
          </FriendsList>
        </FriendListPanel>
      </Container>
    </>
  );
}

export default MyFireStoreApp;
