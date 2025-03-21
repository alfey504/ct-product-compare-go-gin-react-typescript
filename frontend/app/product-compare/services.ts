import { ApiResponse, ProductCompare } from "../../type.ts"

export async function getSummary(prod1: string, prod2: string): Promise<ApiResponse<ProductCompare> | undefined> {
    const url = "/api/product?prod1=" + prod1 + "&prod2=" + prod2 
    let prod : ApiResponse<ProductCompare> | undefined = undefined
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'ContentType' : 'application/json',
                'Accept' : 'application/json',
            }
        })

        if (res.status != 200) {
            console.log("failed api request")
            return undefined
        }
        console.log("this executed")
        const jsonRes = await res.json() as ApiResponse<ProductCompare>
        prod = jsonRes
    }catch(e: any) {
        console.log("api call failed")
        console.log(e.message)
        prod = undefined
    }
    return prod
}

export async function tempGetSummary(prod1: string, prod2: string): Promise <ProductCompare | undefined > {
    const jsonString : ProductCompare | undefined =  {
        "Product1": {
            "Name": "Vileda EasyWring Spin Mop & Bucket System",
            "ShortDescription": "Vileda EasyWring Spin Mop & Bucket System",
            "Description": "Experience hassle-free cleaning with the Vileda EasyWring Spin Mop. Designed with a built-in wringer and foot pedal, this mop eliminates the need for bending and wringing by hand. Vileda's powerful microfibre removes over 99% of bacteria with just water, providing a thorough cleaning experience for your home. The unique mop head design allows for easy access to hard-to-reach areas and tight corners, making cleaning simple.",
            "Rating": "4.3927",
            "RatingsCount": "904",
            "Specifications": [
                {
                    "Label": "Accessories List",
                    "Value": "Wringer"
                },
                {
                    "Label": "Advanced Features",
                    "Value": "Telescopic Handle"
                },
                {
                    "Label": "Assembled Height (cm)",
                    "Value": "143.40 cm"
                },
                {
                    "Label": "Assembled Height (ft)",
                    "Value": "4.70 ft"
                },
                {
                    "Label": "Assembled Height (in)",
                    "Value": "56.46 in"
                },
                {
                    "Label": "Assembled Length (cm)",
                    "Value": "10.00 cm"
                },
                {
                    "Label": "Assembled Length (ft)",
                    "Value": "0.33 ft"
                },
                {
                    "Label": "Assembled Length (in)",
                    "Value": "3.94 in"
                },
                {
                    "Label": "Assembled Weight (kg)",
                    "Value": "0.82 kg"
                },
                {
                    "Label": "Assembled Weight (lb)",
                    "Value": "1.82 lb"
                },
                {
                    "Label": "Assembled Width (cm)",
                    "Value": "10.00 cm"
                },
                {
                    "Label": "Assembled Width (in)",
                    "Value": "3.94 in"
                },
                {
                    "Label": "Assembled Width (mm)",
                    "Value": "100.00 mm"
                },
                {
                    "Label": "Consumer Pack Size",
                    "Value": "1"
                },
                {
                    "Label": "Duty Rating",
                    "Value": "Medium Duty"
                },
                {
                    "Label": "Handle Colour",
                    "Value": "Red"
                },
                {
                    "Label": "Handle Diameter (cm)",
                    "Value": "2.00 cm"
                },
                {
                    "Label": "Handle Diameter (in)",
                    "Value": "0.79 in"
                },
                {
                    "Label": "Handle Length (cm)",
                    "Value": "128.00 cm"
                },
                {
                    "Label": "Handle Length (in)",
                    "Value": "50.39 in"
                },
                {
                    "Label": "Handle Material",
                    "Value": "Plastic"
                },
                {
                    "Label": "Mop Head Colour",
                    "Value": "White"
                },
                {
                    "Label": "Mop Type",
                    "Value": "String"
                },
                {
                    "Label": "Number of Pieces",
                    "Value": "4"
                },
                {
                    "Label": "Package Depth (cm)",
                    "Value": "50.00 cm"
                },
                {
                    "Label": "Package Depth (in)",
                    "Value": "19.69 in"
                },
                {
                    "Label": "Package Height (cm)",
                    "Value": "29.00 cm"
                },
                {
                    "Label": "Package Height (in)",
                    "Value": "11.42 in"
                },
                {
                    "Label": "Package Weight (kg)",
                    "Value": "2.20 kg"
                },
                {
                    "Label": "Package Weight (lb)",
                    "Value": "4.85 lb"
                },
                {
                    "Label": "Package Width (cm)",
                    "Value": "29.00 cm"
                },
                {
                    "Label": "Package Width (in)",
                    "Value": "11.42 in"
                },
                {
                    "Label": "Primary Material",
                    "Value": "Synthetic Fibers"
                },
                {
                    "Label": "Sustainability",
                    "Value": "Terracycle"
                }
            ],
            "Features": [
                "Exclusive bucket design features a built-in wringer and foot pedal that allows for hands-free wringing",
                "Splash guard prevents water from splashing when wringing",
                "Deep-cleaning microfibre removes and absorbs tough dirt and grime",
                "Unique triangle mop head rotates 360 degrees, cleans deep into corners, under furniture, alongside baseboards, and between tiles",
                "Refill is washable and reusable over and over again",
                "Telescopic handle extends to 130 cm to enhance reach without having to bend or stretch",
                "Ideal to clean all hard floor surfaces including wood, vinyl, ceramic, linoleum, and more",
                "Perfect with the Vileda PACS Hard Floor Cleaner – SKU 142-7686"
            ],
            "ReviewSummary": {
                "Positive": [
                    {
                        "Subject": "satisfaction",
                        "PresenceCount": 210,
                        "MentionsCount": 250,
                        "Examples": [
                            {
                                "Title": "Great!",
                                "Text": "Great little mop. I love how the pole closes up so that you can store it and that I no longer get my hands dirty wringing out the water. Wish it came with an extra mop head, it only has one and you have to buy a second one separately.",
                                "Rating": 4
                            },
                            {
                                "Title": "Makes my job a whole lot easier!",
                                "Text": "Love this mop and pail, works great on our hardwood floors!",
                                "Rating": 5
                            },
                            {
                                "Title": "No more ringing",
                                "Text": "Love the easy spin and mop, and switching off mop head.",
                                "Rating": 5
                            },
                            {
                                "Title": "Just a great Mop & Spin bucket!! Happy with my purchase :)",
                                "Text": "Great price and works well, happy with this product>",
                                "Rating": 5
                            },
                            {
                                "Title": "I easy to use mop",
                                "Text": "I love this mop best thing they ever invented. Easy and efficient",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "quality",
                        "PresenceCount": 61,
                        "MentionsCount": 51,
                        "Examples": [
                            {
                                "Title": "Solid",
                                "Text": "Really good quality. Better than the one we replaced.",
                                "Rating": 5
                            },
                            {
                                "Title": "Just a great Mop & Spin bucket!! Happy with my purchase :)",
                                "Text": "Great price and works well, happy with this product>",
                                "Rating": 5
                            },
                            {
                                "Title": "Good value mop",
                                "Text": "Solid performance.Good price, works well. Only wish it had an extra pad for it",
                                "Rating": 5
                            },
                            {
                                "Title": "Great mop and bucket",
                                "Text": "Mop and bucket works well. Wife is now motivated to wash the floors more often, and I'm motivated to enjoy watching her dance around the room with the mop and bucket.",
                                "Rating": 5
                            },
                            {
                                "Title": "Works well",
                                "Text": "Works as advertised.",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "ease of use",
                        "PresenceCount": 174,
                        "MentionsCount": 191,
                        "Examples": [
                            {
                                "Title": "Vileda Easy Wring Mop",
                                "Text": "Very easy to use and easy to clean",
                                "Rating": 5
                            },
                            {
                                "Title": "Vileda easywring  mop and pail",
                                "Text": "Love it so easy to use",
                                "Rating": 5
                            },
                            {
                                "Title": "Vileda EasyWring Spin Mop",
                                "Text": "Easy to use & does a great cleaning job LOVE that there's No Extra packaging in the box- just the items & instructions 👍♥️",
                                "Rating": 4
                            },
                            {
                                "Title": "My new favourite! Simply the best, easy to use and does a very thorough cleaning job.",
                                "Text": "Love this mop so much!",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "flooring",
                        "PresenceCount": 189,
                        "MentionsCount": 150,
                        "Examples": [
                            {
                                "Title": "Cleaning is a breeze!",
                                "Text": "This spin mop makes cleaning my floors a breeze, it takes seconds to spin dry for quick easy wipe ups or larger cleaning jobs.",
                                "Rating": 5
                            },
                            {
                                "Title": "Great mop",
                                "Text": "This mop is great for walls and floors",
                                "Rating": 5
                            },
                            {
                                "Title": "In-floor heated Floors with no spots or streaks!",
                                "Text": "No spots left on our in-floor heated floors & easy to lift & pour the bucket as I refilled & emptied it. The \"twist\" handle took some getting used to & I would suggest a better handle system may be made available by Vileda if the problem persists. The handle would slip in length if too much pressure was applied to the mop, but that much pressure wasn't required to get a clean floor.",
                                "Rating": 5
                            },
                            {
                                "Title": "I like it",
                                "Text": "Simple and easy to use. The spinner takes away almost all the water which has to be better for my hardwood floors.",
                                "Rating": 5
                            },
                            {
                                "Title": "Great mop and bucket",
                                "Text": "Mop and bucket works well. Wife is now motivated to wash the floors more often, and I'm motivated to enjoy watching her dance around the room with the mop and bucket.",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "price",
                        "PresenceCount": 53,
                        "MentionsCount": 43,
                        "Examples": [
                            {
                                "Title": "Good Product",
                                "Text": "This product delivers on it's advertising. Separate from the dirty water and cleaning comes out as expected. Would recommend to others and the price was very good at $39.99 at the time.",
                                "Rating": 5
                            },
                            {
                                "Title": "Just a great Mop & Spin bucket!! Happy with my purchase :)",
                                "Text": "Great price and works well, happy with this product>",
                                "Rating": 5
                            },
                            {
                                "Title": "Great purchase, really great price!",
                                "Text": "Efficient and easy to use.",
                                "Rating": 4
                            },
                            {
                                "Title": "No",
                                "Text": "Nice product and great price",
                                "Rating": 5
                            },
                            {
                                "Title": "Great!",
                                "Text": "Love this mop. The design makes it way to get in corners and also clean baseboards. Bucket is light and the spinning is satisfying. Great design and reasonable price.",
                                "Rating": 5
                            }
                        ]
                    }
                ],
                "Negative": [
                    {
                        "Subject": "small",
                        "PresenceCount": 8,
                        "MentionsCount": 4,
                        "Examples": [
                            {
                                "Title": "Nope",
                                "Text": "The head is too small. When you wet the mop, the head is too small- results in the plastic part scrapping the floor.",
                                "Rating": 1
                            },
                            {
                                "Title": "Defective - I suspect poor quality control at the factory",
                                "Text": "We already had one. It is a great cleaning system I wish we had bought one a long time ago. My mother wanted one so I made this purchase on her behalf. HOWEVER, it was defective and had to be returned. I could not screw the handle onto the mop head. It was like the handle end with the male threads was a couple hairs too small, or the hole with the female threads on the mop head was a couple hairs too large. In any event they would not connect & stay connected. I returned it, wanting to swap it for another one but they had non left in the store. So I got a refund and bought one elsewhere. It works great.",
                                "Rating": 1
                            },
                            {
                                "Title": "Nope",
                                "Text": "The head is too small. When you wet the mop, the head is too small- results in the plastic part scrapping the floor.",
                                "Rating": 1
                            },
                            {
                                "Title": "Mop",
                                "Text": "It doesn't take long before the plastic teeth/gears start slipping. Then the foot pedal won't come back up unless you pull it up by hand. Mop is kind of small and odd shape can make it flop around uselessly.",
                                "Rating": 3
                            }
                        ]
                    },
                    {
                        "Subject": "inconvenient",
                        "PresenceCount": 5,
                        "MentionsCount": 4,
                        "Examples": [
                            {
                                "Title": "Veritable spin mop and bucket",
                                "Text": "To make the basket spin to reduce water in the mop you have to step on a lever at the bottom of the bucket. This motion could be difficult or unsafe for those who have balance problems or have difficulty lifting their foot.",
                                "Rating": 3
                            }
                        ]
                    },
                    {
                        "Subject": "disappointing",
                        "PresenceCount": 9,
                        "MentionsCount": 6,
                        "Examples": [
                            {
                                "Title": "The handle doss not extend long and doesn't lock",
                                "Text": "Extremely disappointing and frustrated I tried so many times and ways to extend the handle but it goes to a certain length and it doesn't look in place as soon as it touches the floor it falls back ro being short again. Am returning it",
                                "Rating": 1
                            },
                            {
                                "Title": "Good mop but falls apart easily",
                                "Text": "Just bought this mop and am quite disappointed. The weight of water is enough to pull the mop head off the handle. There should be a better snap system or anything to hold the mop head in place.",
                                "Rating": 1
                            },
                            {
                                "Title": "best bucket worst mop",
                                "Text": "The bucket is very sturdy and well designed for the use. I am so glad that I don't have to squeeze out the water by hands. I wish they sell the bucket separately because the mop is so disappointing. It doesn't have enough clothes on so I have to be careful not to scratch my floors with the plastic part. The telescopic stick does not stay. I am going to test the bucket with other mops, can't stand on the mop...",
                                "Rating": 3
                            }
                        ]
                    }
                ]
            },
            "Summary": [
                "The Vileda EasyWring Spin Mop & Bucket System offers hands-free wringing with a foot pedal and built-in wringer.",
                "It uses microfiber technology to remove over 99% of bacteria with just water.",
                "It has a unique triangle mop head that rotates 360 degrees for cleaning hard-to-reach areas.",
                "It's suitable for all hard floor surfaces.",
                "The handle extends for better reach."
            ]
        },
        "Product2": {
            "Name": "Vileda EasyWring Spin Mop & Bucket System",
            "ShortDescription": "Vileda EasyWring Spin Mop & Bucket System",
            "Description": "Experience hassle-free cleaning with the Vileda EasyWring Spin Mop. Designed with a built-in wringer and foot pedal, this mop eliminates the need for bending and wringing by hand. Vileda's powerful microfibre removes over 99% of bacteria with just water, providing a thorough cleaning experience for your home. The unique mop head design allows for easy access to hard-to-reach areas and tight corners, making cleaning simple.",
            "Rating": "4.3927",
            "RatingsCount": "904",
            "Specifications": [
                {
                    "Label": "Accessories List",
                    "Value": "Wringer"
                },
                {
                    "Label": "Advanced Features",
                    "Value": "Telescopic Handle"
                },
                {
                    "Label": "Assembled Height (cm)",
                    "Value": "143.40 cm"
                },
                {
                    "Label": "Assembled Height (ft)",
                    "Value": "4.70 ft"
                },
                {
                    "Label": "Assembled Height (in)",
                    "Value": "56.46 in"
                },
                {
                    "Label": "Assembled Length (cm)",
                    "Value": "10.00 cm"
                },
                {
                    "Label": "Assembled Length (ft)",
                    "Value": "0.33 ft"
                },
                {
                    "Label": "Assembled Length (in)",
                    "Value": "3.94 in"
                },
                {
                    "Label": "Assembled Weight (kg)",
                    "Value": "0.82 kg"
                },
                {
                    "Label": "Assembled Weight (lb)",
                    "Value": "1.82 lb"
                },
                {
                    "Label": "Assembled Width (cm)",
                    "Value": "10.00 cm"
                },
                {
                    "Label": "Assembled Width (in)",
                    "Value": "3.94 in"
                },
                {
                    "Label": "Assembled Width (mm)",
                    "Value": "100.00 mm"
                },
                {
                    "Label": "Consumer Pack Size",
                    "Value": "1"
                },
                {
                    "Label": "Duty Rating",
                    "Value": "Medium Duty"
                },
                {
                    "Label": "Handle Colour",
                    "Value": "Red"
                },
                {
                    "Label": "Handle Diameter (cm)",
                    "Value": "2.00 cm"
                },
                {
                    "Label": "Handle Diameter (in)",
                    "Value": "0.79 in"
                },
                {
                    "Label": "Handle Length (cm)",
                    "Value": "128.00 cm"
                },
                {
                    "Label": "Handle Length (in)",
                    "Value": "50.39 in"
                },
                {
                    "Label": "Handle Material",
                    "Value": "Plastic"
                },
                {
                    "Label": "Mop Head Colour",
                    "Value": "White"
                },
                {
                    "Label": "Mop Type",
                    "Value": "String"
                },
                {
                    "Label": "Number of Pieces",
                    "Value": "4"
                },
                {
                    "Label": "Package Depth (cm)",
                    "Value": "50.00 cm"
                },
                {
                    "Label": "Package Depth (in)",
                    "Value": "19.69 in"
                },
                {
                    "Label": "Package Height (cm)",
                    "Value": "29.00 cm"
                },
                {
                    "Label": "Package Height (in)",
                    "Value": "11.42 in"
                },
                {
                    "Label": "Package Weight (kg)",
                    "Value": "2.20 kg"
                },
                {
                    "Label": "Package Weight (lb)",
                    "Value": "4.85 lb"
                },
                {
                    "Label": "Package Width (cm)",
                    "Value": "29.00 cm"
                },
                {
                    "Label": "Package Width (in)",
                    "Value": "11.42 in"
                },
                {
                    "Label": "Primary Material",
                    "Value": "Synthetic Fibers"
                },
                {
                    "Label": "Sustainability",
                    "Value": "Terracycle"
                }
            ],
            "Features": [
                "Exclusive bucket design features a built-in wringer and foot pedal that allows for hands-free wringing",
                "Splash guard prevents water from splashing when wringing",
                "Deep-cleaning microfibre removes and absorbs tough dirt and grime",
                "Unique triangle mop head rotates 360 degrees, cleans deep into corners, under furniture, alongside baseboards, and between tiles",
                "Refill is washable and reusable over and over again",
                "Telescopic handle extends to 130 cm to enhance reach without having to bend or stretch",
                "Ideal to clean all hard floor surfaces including wood, vinyl, ceramic, linoleum, and more",
                "Perfect with the Vileda PACS Hard Floor Cleaner – SKU 142-7686"
            ],
            "ReviewSummary": {
                "Positive": [
                    {
                        "Subject": "ease of use",
                        "PresenceCount": 174,
                        "MentionsCount": 191,
                        "Examples": [
                            {
                                "Title": "Vileda Easy Wring Mop",
                                "Text": "Very easy to use and easy to clean",
                                "Rating": 5
                            },
                            {
                                "Title": "Vileda easywring  mop and pail",
                                "Text": "Love it so easy to use",
                                "Rating": 5
                            },
                            {
                                "Title": "Vileda EasyWring Spin Mop",
                                "Text": "Easy to use & does a great cleaning job LOVE that there's No Extra packaging in the box- just the items & instructions 👍♥️",
                                "Rating": 4
                            },
                            {
                                "Title": "My new favourite! Simply the best, easy to use and does a very thorough cleaning job.",
                                "Text": "Love this mop so much!",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "flooring",
                        "PresenceCount": 189,
                        "MentionsCount": 150,
                        "Examples": [
                            {
                                "Title": "Cleaning is a breeze!",
                                "Text": "This spin mop makes cleaning my floors a breeze, it takes seconds to spin dry for quick easy wipe ups or larger cleaning jobs.",
                                "Rating": 5
                            },
                            {
                                "Title": "Great mop",
                                "Text": "This mop is great for walls and floors",
                                "Rating": 5
                            },
                            {
                                "Title": "In-floor heated Floors with no spots or streaks!",
                                "Text": "No spots left on our in-floor heated floors & easy to lift & pour the bucket as I refilled & emptied it. The \"twist\" handle took some getting used to & I would suggest a better handle system may be made available by Vileda if the problem persists. The handle would slip in length if too much pressure was applied to the mop, but that much pressure wasn't required to get a clean floor.",
                                "Rating": 5
                            },
                            {
                                "Title": "I like it",
                                "Text": "Simple and easy to use. The spinner takes away almost all the water which has to be better for my hardwood floors.",
                                "Rating": 5
                            },
                            {
                                "Title": "Great mop and bucket",
                                "Text": "Mop and bucket works well. Wife is now motivated to wash the floors more often, and I'm motivated to enjoy watching her dance around the room with the mop and bucket.",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "price",
                        "PresenceCount": 53,
                        "MentionsCount": 43,
                        "Examples": [
                            {
                                "Title": "Good Product",
                                "Text": "This product delivers on it's advertising. Separate from the dirty water and cleaning comes out as expected. Would recommend to others and the price was very good at $39.99 at the time.",
                                "Rating": 5
                            },
                            {
                                "Title": "Just a great Mop & Spin bucket!! Happy with my purchase :)",
                                "Text": "Great price and works well, happy with this product>",
                                "Rating": 5
                            },
                            {
                                "Title": "Great purchase, really great price!",
                                "Text": "Efficient and easy to use.",
                                "Rating": 4
                            },
                            {
                                "Title": "No",
                                "Text": "Nice product and great price",
                                "Rating": 5
                            },
                            {
                                "Title": "Great!",
                                "Text": "Love this mop. The design makes it way to get in corners and also clean baseboards. Bucket is light and the spinning is satisfying. Great design and reasonable price.",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "satisfaction",
                        "PresenceCount": 210,
                        "MentionsCount": 250,
                        "Examples": [
                            {
                                "Title": "Great!",
                                "Text": "Great little mop. I love how the pole closes up so that you can store it and that I no longer get my hands dirty wringing out the water. Wish it came with an extra mop head, it only has one and you have to buy a second one separately.",
                                "Rating": 4
                            },
                            {
                                "Title": "Makes my job a whole lot easier!",
                                "Text": "Love this mop and pail, works great on our hardwood floors!",
                                "Rating": 5
                            },
                            {
                                "Title": "No more ringing",
                                "Text": "Love the easy spin and mop, and switching off mop head.",
                                "Rating": 5
                            },
                            {
                                "Title": "Just a great Mop & Spin bucket!! Happy with my purchase :)",
                                "Text": "Great price and works well, happy with this product>",
                                "Rating": 5
                            },
                            {
                                "Title": "I easy to use mop",
                                "Text": "I love this mop best thing they ever invented. Easy and efficient",
                                "Rating": 5
                            }
                        ]
                    },
                    {
                        "Subject": "quality",
                        "PresenceCount": 61,
                        "MentionsCount": 51,
                        "Examples": [
                            {
                                "Title": "Solid",
                                "Text": "Really good quality. Better than the one we replaced.",
                                "Rating": 5
                            },
                            {
                                "Title": "Just a great Mop & Spin bucket!! Happy with my purchase :)",
                                "Text": "Great price and works well, happy with this product>",
                                "Rating": 5
                            },
                            {
                                "Title": "Good value mop",
                                "Text": "Solid performance. Good price, works well. Only wish it had an extra pad for it",
                                "Rating": 5
                            },
                            {
                                "Title": "Great mop and bucket",
                                "Text": "Mop and bucket works well. Wife is now motivated to wash the floors more often, and I'm motivated to enjoy watching her dance around the room with the mop and bucket.",
                                "Rating": 5
                            },
                            {
                                "Title": "Works well",
                                "Text": "Works as advertised.",
                                "Rating": 5
                            }
                        ]
                    }
                ],
                "Negative": [
                    {
                        "Subject": "small",
                        "PresenceCount": 8,
                        "MentionsCount": 4,
                        "Examples": [
                            {
                                "Title": "Nope",
                                "Text": "The head is too small. When you wet the mop, the head is too small- results in the plastic part scrapping the floor.",
                                "Rating": 1
                            },
                            {
                                "Title": "Defective - I suspect poor quality control at the factory",
                                "Text": "We already had one. It is a great cleaning system I wish we had bought one a long time ago. My mother wanted one so I made this purchase on her behalf. HOWEVER, it was defective and had to be returned. I could not screw the handle onto the mop head. It was like the handle end with the male threads was a couple hairs too small, or the hole with the female threads on the mop head was a couple hairs too large. In any event they would not connect & stay connected. I returned it, wanting to swap it for another one but they had non left in the store. So I got a refund and bought one elsewhere. It works great.",
                                "Rating": 1
                            },
                            {
                                "Title": "Nope",
                                "Text": "The head is too small. When you wet the mop, the head is too small- results in the plastic part scrapping the floor.",
                                "Rating": 1
                            },
                            {
                                "Title": "Mop",
                                "Text": "It doesn't take long before the plastic teeth/gears start slipping. Then the foot pedal won't come back up unless you pull it up by hand. Mop is kind of small and odd shape can make it flop around uselessly.",
                                "Rating": 3
                            }
                        ]
                    },
                    {
                        "Subject": "inconvenient",
                        "PresenceCount": 5,
                        "MentionsCount": 4,
                        "Examples": [
                            {
                                "Title": "Veritable spin mop and bucket",
                                "Text": "To make the basket spin to reduce water in the mop you have to step on a lever at the bottom of the bucket. This motion could be difficult or unsafe for those who have balance problems or have difficulty lifting their foot.",
                                "Rating": 3
                            }
                        ]
                    },
                    {
                        "Subject": "disappointing",
                        "PresenceCount": 9,
                        "MentionsCount": 6,
                        "Examples": [
                            {
                                "Title": "The handle doss not extend long and doesn't lock",
                                "Text": "Extremely disappointing and frustrated I tried so many times and ways to extend the handle but it goes to a certain length and it doesn't look in place as soon as it touches the floor it falls back ro being short again. Am returning it",
                                "Rating": 1
                            },
                            {
                                "Title": "Good mop but falls apart easily",
                                "Text": "Just bought this mop and am quite disappointed. The weight of water is enough to pull the mop head off the handle. There should be a better snap system or anything to hold the mop head in place.",
                                "Rating": 1
                            },
                            {
                                "Title": "best bucket worst mop",
                                "Text": "The bucket is very sturdy and well designed for the use. I am so glad that I don't have to squeeze out the water by hands. I wish they sell the bucket separately because the mop is so disappointing. It doesn't have enough clothes on so I have to be careful not to scratch my floors with the plastic part. The telescopic stick does not stay. I am going to test the bucket with other mops, can't stand on the mop...",
                                "Rating": 3
                            }
                        ]
                    }
                ]
            },
            "Summary": [
                "The Vileda EasyWring Spin Mop & Bucket System offers hands-free wringing with a foot pedal and built-in wringer.",
                "It uses microfiber technology to remove over 99% of bacteria with just water.",
                "It has a unique triangle mop head that rotates 360 degrees for cleaning hard-to-reach areas.",
                "It's suitable for all hard floor surfaces.",
                "The handle extends for better reach."
            ]
        },
        "KeyDifferences": [
            "There are no key differences, both products have the same specifications and features.",
            "Potentially same item listed twice, therefore no actual difference in features"
        ]
    }
    return jsonString
}