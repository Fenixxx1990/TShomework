const user = {
  name: "Vasiliy",
  age: 8,
  skills: ["typescript", "javascript"],
};

interface User {
  name: string;
  age: number;
  skills: string[];
}

function pickObjectKeys<T extends User, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

console.log(pickObjectKeys(user, ["name", "age"])); // { name: "Vasiliy", age: 8 }
console.log(pickObjectKeys(user, ["name", "skills"])); // { name: "Vasiliy", skills: ["typescript", "javascript"] }
console.log(pickObjectKeys(user, ["age", "skills"])); // { age: 8, skills: ["typescript", "javascript"] }

// const res = pickObjectKeys(user, ["age", "skills"]);
/*
{
  age: 8,
  skills: ['typescript', 'javascript']
}
*/
