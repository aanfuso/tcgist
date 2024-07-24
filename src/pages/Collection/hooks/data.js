import { useState, useEffect } from "react";

import { db } from "lib/firebase";
import { onValue, ref } from "firebase/database";

const useData = (path) => {
  const [data, setData] = useState();

  useEffect(() => {
    const query = ref(db, path);

    return onValue(query, (snapshot) => {
      const response = snapshot.val();

      if (snapshot.exists()) setData(response);
    })
  }, [path])

  return data;
};

export default useData;
