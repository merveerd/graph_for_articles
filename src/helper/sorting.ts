import { subArticle } from '../models/models'
import {types} from './stringTypes';
export function MergeSort(items: Array<subArticle>, type: string): Array<subArticle> {

   if(type === types.numeric)  return divideForNumeric(items);
   return divideForAlphabetic(items)
}

function divideForNumeric(items: Array<subArticle>) {
    var halfLength = Math.ceil(items.length / 2);
    var low = items.slice(0, halfLength);
    var high = items.slice(halfLength);
    if (halfLength > 1) {
        low = divideForNumeric(low);
        high = divideForNumeric(high);
    }
    return combineNumerically(low, high);
    
}
function combineNumerically(low: Array<subArticle>, high: Array<subArticle>): Array<subArticle> {
    var indexLow = 0;
    var indexHigh = 0;
    var lengthLow = low.length;
    var lengthHigh = high.length;
    var combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
        var lowItem = low[indexLow];
        var highItem = high[indexHigh];
        if (lowItem !== undefined) {
            if (highItem === undefined) {
                combined.push(lowItem);
                indexLow++;
            } else {
                if (lowItem.frequency >= highItem.frequency) {
                    combined.push(lowItem);
                    indexLow++;
                } else {
                    combined.push(highItem);
                    indexHigh++;
                }
            }
        } else {
            if (highItem !== undefined) {
                combined.push(highItem);
                indexHigh++;
            }
        }
    }
    return combined;
}

function divideForAlphabetic(items: Array<subArticle>) {
    var halfLength = Math.ceil(items.length / 2);
    var low = items.slice(0, halfLength);
    var high = items.slice(halfLength);
    if (halfLength > 1) {
        low = divideForAlphabetic(low);
        high = divideForAlphabetic(high);
    }
    return combineAlphabetically(low, high);
    
}
function combineAlphabetically(low: Array<subArticle>, high: Array<subArticle>): Array<subArticle> {
    var indexLow = 0;
    var indexHigh = 0;
    var lengthLow = low.length;
    var lengthHigh = high.length;
    var combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
        var lowItem = low[indexLow];
        var highItem = high[indexHigh];
        if (lowItem !== undefined) {
            if (highItem === undefined) {
                combined.push(lowItem);
                indexLow++;
            } else {
                if (lowItem.name <= highItem.name) {
                    combined.push(lowItem);
                    indexLow++;
                } else {
                    combined.push(highItem);
                    indexHigh++;
                }
            }
        } else {
            if (highItem !== undefined) {
                combined.push(highItem);
                indexHigh++;
            }
        }
    }
    return combined;
}