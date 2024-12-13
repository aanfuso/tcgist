import { useState, useEffect } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "lib/firebase";

const useBuylist = (path) => {
  const [data, setData] = useState();

  useEffect(() => {
    const query = ref(db, path);

    return onValue(query, (snapshot) => {
      const response = snapshot.val();

      if (snapshot.exists()) setData(response);
    })
  }, [path])

  const save = (list) => {
    set(ref(db, path), list);
  }

  return [data, save];
};

export default useBuylist;
