
export const calcultate5starsVote =  (votes) => {
    let stars = []
    let uno = 0
    let due = 0
    let tre = 0
    let quattro = 0
    let cinque = 0

    for (const vote of votes) {

        if (vote == 1) {
            uno = + 1
        }
        else if (vote == 2) {
            due = + 1
        }
        else if (vote == 3) {
            tre++;
        }
        else if (vote == 4) {
            quattro = + 1

        }
        else if (vote == 5) {
            cinque += 1
        }

    }
    stars.push({ 1: uno, 2: due, 3: tre, 4: quattro, 5: cinque })
    const resultAvarage = (5 * stars[0]['5'] + 4 * stars[0]['4'] + 3 * stars[0]['3'] + 2 * stars[0]['2'] + 1 * stars[0]['1']) / (stars[0]['5'] + stars[0]['4'] + stars[0]['3'] + stars[0]['2'] + stars[0]['1'])
    return resultAvarage

}