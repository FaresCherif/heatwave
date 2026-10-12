// English texts
export default {
    ui: {
        dialogue: {
            next: 'Click to continue ▸',
            hangUp: 'Click to hang up ▸',
            skip: 'Skip call'
        },
        form: {
            title: 'New employee form',
            subtitle: 'Human resources department — mandatory',
            deadline: 'Due before {time}',
            open: '📋 HR form',
            close: 'Close',
            name: 'Name',
            sex: 'Sex',
            male: 'Male',
            female: 'Female',
            other: 'Other',
            age: 'Age',
            ratings: 'Rate from 1 to 5',
            love: 'Love for the company',
            suicide: 'Suicidal urges',
            toilets: 'Risk of clogging the office toilets',
            submit: 'Sign',
            timeout: 'HR form not handed in before {time}. HR escorted you to the exit.'
        },
        levelSelect: {
            title: 'Secret code',
            subtitle: 'Choose your level',
            back: 'Back'
        },
        shop: {
            title: 'Shop',
            money: 'Your money: {money} €',
            buy: 'Buy — {price} €',
            owned: 'Owned ✓',
            continue: 'Next level',
            items: {
                fan: {
                    name: 'Electric fan',
                    description: 'Thanks to human genius, your little arms will be less tired at the end of the day. Heat rises 25% slower.'
                },
                ai: {
                    name: 'AI subscription',
                    description: 'Don\'t worry about the terminals it keeps opening, they\'re probably useful. Work drops 30% slower.'
                },
                plant: {
                    name: 'Potted plant',
                    description: 'Still more useful than you\'ll ever be. The overheat threshold goes up by 10 points.'
                },
                voicemail: {
                    name: 'Voicemail',
                    description: 'Thanks to a clip of your latest shower concert, urgent calls wait on the answering machine: 3 more seconds to pick up.'
                }
            }
        }
    },

    dialogues: {
        welcome: {
            caller: 'The boss',
            lines: [
                'Hello? Ah, so you\'re the new m... member of our big, beautiful family!',
                'With this heatwave, our dear and esteemed union representatives have reported that office temperatures were supposedly "contrary to human dignity".',
                'While the heatwave passes (and the union leader recovers from his mysterious fall out of the window), the company is generously offering you a week of remote work.',
                'How lucky you are! And it doesn\'t stop there: the marketing department is even giving a hand fan to the poorest employee: YOU. Lucky you, we really spoil you.',
                'Now get to work! And remember: no output, no paycheck.'
            ]
        },
        firstday: {
            caller: 'The boss',
            lines: [
                'HEY HEY HEY, our rising star! So, not too tired after your first day?',
                'Of course not, your only task of the day was to write your name (and you still managed to make a typo!)',
                'Anyway, after about a hundred missed calls and two full voicemail boxes, we realized that your colleague who thought he was a pigeon was the one handling the switchboard.',
                'Honestly, he could have told us. Sure, he\'s intubated, but he could have written it down! I swear, nobody has any work ethic these days.',
                'I can hear in your silence that you\'re moved. Since you seem very nice and you\'re still on probation, you get the chance to take over his job.',
                'All you have to do is answer the phone.',
                'Your family is counting on you!'
            ]
        }
    }
};
