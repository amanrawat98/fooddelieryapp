export const handleActiveOutletData = (restaurantOutlets, selectedOutlet) => {
    const outletData = restaurantOutlets?.find((val) => val?.restaurantOutletId == selectedOutlet)
    return outletData

}
export const  convertToFormattedDate=(inputDate)=> {
    const date = new Date(inputDate);
  
    return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
  }