
interface Prompt {
    id: string;
    prompt: string;
    answer: string;
    children?: Prompt[];
}

const promptTree: Prompt[] = [
    {
        id: "1",
        prompt: "Geht es um ein Gerät?",
        answer: "Sehr schön aber sag was dein gerät ist",
        children: [
            {
                id: "1.1",
                prompt: "Cleanbug",
                answer: "Welche Probleme haben Sie mit ihrem Cleanbug?",
                children: [
                    {
                        id: "1.1.1",
                        prompt: "Stürzt treppen ab",
                        answer: "Unsere Team arbeitet momentan an einem Update, dass dieses Problem behebt. In der Zwischenzeit versuchen sie bitte den Cleanbug von jeglichen Treppen fernzuhalten. Wir entschuldigen uns für die Unannehmlichkeiten.",
                    },
                    {
                        id: "1.1.2",
                        prompt: "Probleme bei Konfiguration",
                        answer: "Um den Cleanbug zu konfigurieren, gehen Sie bitte in die App und folgen Sie den Anweisungen. Wenn das Problem weiterhin besteht, versuchen Sie bitte den Cleanbug zurückzusetzen. Halten Sie dazu die Reset-Taste für 10 Sekunden gedrückt.",
                    }
                ]
            },
            {
                id: "1.2",
                prompt: "Windowfly",
                answer: "blablabal",
                children: [
                    {
                        id: "1.2.1",
                        prompt: "Saugt sich an fenstern fest",
                        answer: "Unser Team arbeitet momentan an einem Update, wodurch der Windowfly nicht mehr an Fenstern festhängt. Es tut uns leid für diese Unannehmlichkeiten.",
                    },
                    {
                        id: "1.2.2",
                        prompt: "Probleme bei Konfiguration",
                        answer: "Um den Windowfly zu konfigurieren, gehen Sie bitte in die App und folgen Sie den Anweisungen. Wenn das Problem weiterhin besteht, versuchen Sie bitte den Windowfly zurückzusetzen. Halten Sie dazu die Reset-Taste für 10 Sekunden gedrückt.",
                    }
                ]
            },
            {
                id: "1.3",
                prompt: "Gardenbeetle",
                answer: "blablabal",
                children: [
                    {
                        id: "1.3.1",
                        prompt: "Lässt den Rasen liegen",
                        answer: "Wenn der Gardenbeetle probleme hat den Rasen zu mähen, kann dies mehrere Ursachen haben. <br> <ol> <li> Der Fegekopf ist verstopft. Drehen sie ihren Gardenbeetle um und entfernen sie den Fegekopf. Reinigen sie diesen mit Wasser und einer Bürste. </li> <li> Der Rasen ist zu hoch. Wenn der Rasen höher als 10cm ist, kann der Gardenbeetle nicht mähen. </li> <li> Der Gardenbeetle hat kein Strom. Bitte laden sie den Gardenbeetle auf. Sie können den Ladestand in der App sehen oder mit dem Licht. Wenn es rot blinken sollte, heißt es dass der Gardenbeetle keinen Akku mehr hat.</li> </ol>",
                    },
                    {
                        id: "1.3.2",
                        prompt: "Probleme bei Konfiguration",
                        answer: "Um den Gardenbeetle zu konfigurieren, gehen Sie bitte in die App und folgen Sie den Anweisungen. Wenn das Problem weiterhin besteht, versuchen Sie bitte den Gardenbeetle zurückzusetzen. Halten Sie dazu die Reset-Taste für 10 Sekunden gedrückt.",
                    },
                ]
            },
            {
                id: "1.4",
                prompt: "Anderes Gerät",
                answer: "Wenn Sie Probleme mit einem anderen Gerät haben, kann es viele Ursachen für ihr Problem geben.",
                children: [
                    {
                        id: "1.4.2",
                        prompt: "Probleme bei Konfiguration",
                        answer: "Jegliche Geräte können in der App konfiguriert werden. Wenn das Problem weiterhin besteht, versuchen Sie bitte das Gerät zurückzusetzen. Halten Sie dazu die Reset-Taste für 10 Sekunden gedrückt.",
                    }
                ]
            },
        ]
    },
    {
        id: "2",
        prompt: "Irgendwas mit lieferung",
        answer: "schöne lieferung",
    },
    {
        id: "3",
        prompt: "Support ist schlecht",
        answer: "wow tut mir so leid",
    }
]

export {promptTree, type Prompt}