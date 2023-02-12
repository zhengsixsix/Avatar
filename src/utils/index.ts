import { AvatarOption, None } from '../types/index';
import { SETTINGS, NONE, AVATAR_LAYER, SPECIAL_AVATARS } from './constant';
import { BeardShape, Gender, TopsShape, EarringsShape, GlassesShape } from '../enums/index';
import { previewData } from '@/utils/dynamic-data';
function getRandomValue<Item = unknown>(
    arr: Item[],
    { avoid = [], usually = [] }: { avoid?: unknown[], usually?: (Item | 'none')[] } = {}
): Item {
    const avoidValue = avoid.filter(Boolean)
    const filteredArr = arr.filter((it) => !avoidValue.includes(it))
    const usuallyValues = usually.filter(Boolean).reduce<Item[]>((acc, cur) => acc.concat(new Array(15).fill(cur)), [])
    const finalArr = filteredArr.concat(usuallyValues)
    const randomIdx = Math.floor(Math.random() * finalArr.length)
    const randomValue = finalArr[randomIdx]
    return randomValue
}
export function getRandomFillColor() {
    return SETTINGS.commonColors[
        Math.floor(Math.random() * SETTINGS.commonColors.length)
    ]
}
export function getRandomAvatarOption(presetOption: Partial<AvatarOption> = {}, useOption: Partial<AvatarOption> = {}): AvatarOption {
    const gender = getRandomValue(SETTINGS.gender)
    const beardList: BeardShape[] = []
    let topList: TopsShape[] = [TopsShape.Danny, TopsShape.Wave, TopsShape.Pixie]
    if (gender === Gender.Male) {
        beardList.push(BeardShape.Scruff)
        topList = SETTINGS.topsShape.filter(shape => !topList.includes(shape))
    }
    const beardShape = getRandomValue<BeardShape | None>(beardList, {
        usually: [NONE]
    })
    const hairShape = getRandomValue(topList, {
        avoid: [useOption.widgets?.tops?.shape]
    })
    const hairColor = getRandomFillColor()
    const avatarOption: AvatarOption = {
        gender,
        wrapperShape: presetOption.wrapperShape || getRandomValue(SETTINGS.wrapperShape),
        background: {
            color: getRandomValue(SETTINGS.backgroundColor, {
                avoid: [
                    useOption.background?.color,
                    (hairShape === TopsShape.Punk || hairShape === TopsShape.Fonze) && hairColor
                ]
            })
        },
        widgets: {
            face: {
                shape: getRandomValue(SETTINGS.faceShape)
            },
            tops: {
                shape: hairShape,
                fillColor: hairColor
            },
            ear: {
                shape: getRandomValue(SETTINGS.earShape, {
                    avoid: [useOption.widgets?.ear?.shape]
                })
            },
            earrings: {
                shape: getRandomValue<EarringsShape | None>(SETTINGS.earringsShape, {
                    usually: [NONE]
                })
            },
            eyebrows: {
                shape: getRandomValue(SETTINGS.eyebrowsShape, {
                    avoid: [useOption.widgets?.eyebrows?.shape],
                }),
            },
            eyes: {
                shape: getRandomValue(SETTINGS.eyesShape, {
                    avoid: [useOption.widgets?.eyes?.shape],
                }),
            },
            nose: {
                shape: getRandomValue(SETTINGS.noseShape, {
                    avoid: [useOption.widgets?.nose?.shape],
                }),
            },
            glasses: {
                shape: getRandomValue<GlassesShape | None>(SETTINGS.glassesShape, {
                    usually: [NONE],
                }),
            },
            mouth: {
                shape: getRandomValue(SETTINGS.mouthShape, {
                    avoid: [useOption.widgets?.mouth?.shape],
                }),
            },
            beard: {
                shape: beardShape,

                // HACK:
                ...(beardShape === BeardShape.Scruff
                    ? { zIndex: AVATAR_LAYER['mouth'].zIndex - 1 }
                    : undefined),
            },
            clothes: {
                shape: getRandomValue(SETTINGS.clothesShape, {
                    avoid: [useOption.widgets?.clothes?.shape],
                }),
                fillColor: getRandomFillColor(),
            },
        }
    }
    return avatarOption
}
export function getSpecialAvatarOption(): AvatarOption {
    return SPECIAL_AVATARS[Math.floor(Math.random() * SPECIAL_AVATARS.length)]
}
export function showConfetti() {
    import('canvas-confetti').then(confetti => {
        const canvasEle: HTMLCanvasElement | null = document.querySelector('#confetti')
        if (!canvasEle) return
        const myConfetti = confetti.create(canvasEle, {
            resize: true,
            useWorker: true,
            disableForReducedMotion: true,
        })
        const duration = performance.now() + 1 * 1000
        const confettiColors = ['#6967fe', '#85e9f4', '#e16984']
        void (function frame() {
            myConfetti({
                particleCount: confettiColors.length,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: confettiColors,
            })
            myConfetti({
                particleCount: confettiColors.length,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: confettiColors,
            })

            if (performance.now() < duration) {
                requestAnimationFrame(frame)
            }
        })()
    })
}