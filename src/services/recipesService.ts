export type Recipe = {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    ingredients: string;
    directions: string;
};

const recipes: Recipe[] = [
    {
        id: '1',
        imageUrl:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmatekitchen.com%2Fwp-content%2Fuploads%2F2019%2F08%2Fbanitsa_s_praz_i_sirene_b.jpg&f=1&nofb=1&ipt=4c08af3c8b1ec319ec6b1890a10ae5bcec8988984f1cce11707ad223661b5924',
        title: 'Баница',
        description: 'Традиционно българско печиво с кори, яйца и сирене.',
        ingredients: 'Фини кори, яйца, кисело мляко, сирене, масло.',
        directions:
            'Разбийте яйцата с киселото мляко и натрошеното сирене. Намажете всяка кора с масло, поръсете с плънката и навийте. Подредете в тава и печете до златисто.',
    },
    {
        id: '2',
        imageUrl:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgotvim.info%2Fwp-content%2Fuploads%2F2023%2F07%2Fturski-mekici.jpg&f=1&nofb=1&ipt=1233be4db1059c541983f600a9f1c4ee2949a6c10c40e52d3fb665e984aba2a6',
        title: 'Мекици',
        description: 'Пухкави пържени тестени изделия, популярни за закуска.',
        ingredients: 'Брашно, яйца, кисело мляко, сода бикарбонат, сол, олио за пържене.',
        directions:
            'Замесете меко тесто от всички съставки. Оставете да втаса. Оформете топки, разтеглете ги и изпържете в горещо олио до златисто.',
    },
    {
        id: '3',
        imageUrl:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvsichki-recepti.com%2Fwp-content%2Fuploads%2F2021%2F02%2FSalata-Snejanka-s-tsedeno-kiselo-mlyako-600x400.jpg%3Fv%3D1614518407&f=1&nofb=1&ipt=3de2d8a74363b3418e70ca372b786dc62f77ed86a5af9159a0b4906e430ec7a4',
        title: 'Салата Снежанка',
        description: 'Освежаваща салата с кисело мляко и краставици.',
        ingredients: 'Цедено кисело мляко, краставици, чесън, копър, сол, орехи.',
        directions:
            'Нарежете краставиците на малки кубчета. Смесете с цеденото мляко, счукания чесън, нарязания копър и солта. Поръсете с натрошени орехи преди сервиране.',
    },
    {
        id: '4',
        imageUrl: 'https://www.hedonist-bg.com/wp-content/uploads/2020/10/patatnik-1.jpg',
        title: 'Пататник',
        description: 'Традиционно ястие от Родопите с настъргани картофи и подправки.',
        ingredients: 'Картофи, лук, яйца, сол, джоджен, олио.',
        directions:
            'Настържете картофите и лука. Смесете с яйцата, солта и джоджена. Изсипете в намазнена тава и печете до златиста коричка.',
    },
    {
        id: '5',
        imageUrl:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-2tcsIEhCGzQ%2FWte_cMxWLzI%2FAAAAAAAAJnk%2FLwBvT8Fl_HM-A1xDFZF1Mw-9tgvuj-w0ACLcBGAs%2Fs1600%2FP1050727-crop%252B%2525D0%2525A4%2525D0%2525A1%252B%2525D0%2525BD%252B%2525D0%2525BD.JPG&f=1&nofb=1&ipt=a8cf998203aab6a25d12f9bf5dd81a9c187bd68db0314578b6fbd1975d9ec9c2',
        title: 'Лютика',
        description: 'Пикантна салата от печени чушки и домати.',
        ingredients: 'Печени чушки, домати, чесън, лук, олио, сол, магданоз.',
        directions:
            'Обелете печените чушки и нарежете на ситно. Смесете с нарязаните домати, счукания чесън, нарязания лук и магданоз. Подправете със сол и олио.',
    },
];

export async function getAllRecipes(): Promise<Recipe[]> {
    return new Promise((resolve) => setTimeout(resolve, 1000, recipes));
}

export async function getRecipe(recipeId: string): Promise<Recipe> {
    const recipe = recipes.find((x) => x.id === recipeId);

    if (recipe) {
        return new Promise((resolve) => setTimeout(resolve, 1000, recipe));
    }

    return new Promise((_, reject) => setTimeout(reject, 1000));
}

export async function createRecipe() {}

export async function updateRecipe() {}

export async function deleteRecipe() {}
