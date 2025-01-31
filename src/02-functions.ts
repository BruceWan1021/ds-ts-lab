import {Friend, Colleague, EmailContact } from './myTypes'
import { friends, colleagues } from './01-basics';

function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function allOlder(fs: Friend[]): string[] {
    return fs.map(f => older(f));
} 
console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));
  
function addColleague(cs: Colleague[], name: string, department: string, email: string) {
    const highestExt = highestExtension(cs).contact.extension;
    cs.push({
        name, department, 
        contact: {email, extension: highestExt + 1}
    })
}
addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number
): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
        end = max < 2 ? 1: max
    }
    const sorted = colleagues.sort(sorter); // Colleague[] inferred
    const fullResult = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0, end)
}
  
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length)));
  
function findFriends(
    fs: Friend[],
    criterion: (f: Friend) => boolean
  ): string[] {
    return fs.filter(criterion).map((f) => f.name);
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friend : Friend, interest : string) :string[] {
    if (!friend.interests) {
        friend.interests = [];
    }
    friend.interests.push(interest);
    return friend.interests;
}
console.log(addInterest(friends[0], 'politics'));

