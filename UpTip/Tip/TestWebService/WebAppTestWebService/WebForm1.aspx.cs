using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.Globalization;
using System.IO;

namespace WebAppTestWebService
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            List<ModelDataCar> ModelDataCar = new List<ModelDataCar>();

            var service1 = new th.co.lmginsurance.ebizuat.Service1();

            //CarBrand carBrand =  GetCarBrand(service1);

            //for (int i = 0; i < carBrand.data.Count; i++)
            //{
                //CarRegisYear carRegisYear = GetCarRegisYear(service1, carBrand.data[i].car_brand_value);
            int count = 0;

            CarRegisYear carRegisYear = GetCarRegisYear(service1, "LAND ROVER");

                for (int j = 0; j < carRegisYear.data.Count; j++)
                {
                    CarModel carModel = GetCarModel(service1, "LAND ROVER", carRegisYear.data[j].regis_year_value);

                    for (int k = 0; k < carModel.data.Count; k++)
                    {
                        CarModelDescription carModelDescription = GetModelDescription(service1, "LAND ROVER", carRegisYear.data[j].regis_year_value, carModel.data[k].model_value);

                        for (int l = 0; l < carModelDescription.data.Count; l++)
                        {
                            ModelDataCar = GetCarInsuredAv(service1, "LAND ROVER", carRegisYear.data[j].regis_year_value, carModel.data[k].model_value, carModelDescription.data[l].sub_model_value, carModelDescription.data[l].Sum_Insured, ModelDataCar);
                            System.Threading.Thread.Sleep(50);
                            count++;

                            //GC.SuppressFinalize(this);

                        }

                    }
                }
            //} 
            Export_to_excel(ModelDataCar);

        }

        private void Export_to_excel(List<ModelDataCar> listDataExport)
        {
            var dummyGv = new GridView { AllowPaging = false, DataSource = listDataExport };
            dummyGv.DataBind();
            Response.Clear();
            Response.Buffer = true;
            Response.AddHeader("content-disposition", "attachment;filename=LmgCarWebService" + DateTime.Now.ToString(CultureInfo.InvariantCulture).Replace("/", "-").Replace(":", "_") + ".xls");
            Response.Charset = "";
            Response.ContentType = "application/vnd.ms-excel";

            var sw = new StringWriter();
            var hw = new HtmlTextWriter(sw);

            for (int i = 0; i < dummyGv.Rows.Count; i++)
            {
                //Apply text style to each Row
                dummyGv.Rows[i].Attributes.Add("class", "textmode");
            }

            dummyGv.RenderControl(hw);

            const string style = @"<style> .textmode { mso-number-format:\@; } </style>";
            Response.Write(style);
            Response.Output.Write(sw.ToString());
            Response.Flush();
            Response.End();
        }

        public List<ModelDataCar> GetCarInsuredAv(th.co.lmginsurance.ebizuat.Service1 service1, string car_brand_value, string regis_year_value, string car_model_value, string sub_model_value, string sum_Insured, List<ModelDataCar> ModelDataCar )
        {

            string getJsonCarInsuredAV = service1.WSGetCarInsuredAV(car_brand_value, regis_year_value, car_model_value, sub_model_value);

            ObjectCarInsuredAV ObjectLmgCarInsuredAV = JsonConvert.DeserializeObject<ObjectCarInsuredAV>(getJsonCarInsuredAV);

            string objectLmgCarInsuredAVInsureCapitalToString = @"{""Capital"":" + Convert.ToString(ObjectLmgCarInsuredAV.INSURE_CAPITAL) + "}";

            CarInsuredAVCapital carInsuredCapital = JsonConvert.DeserializeObject<CarInsuredAVCapital>(objectLmgCarInsuredAVInsureCapitalToString);


            string objectLmgCarInsuredAVLimitCapitalToString = @"{""LimitCapital"":" + Convert.ToString(ObjectLmgCarInsuredAV.LIMIT_CAPITAL) + "}";

            CarInsuredAVLimitCapital carInsuredLimitCapital = JsonConvert.DeserializeObject<CarInsuredAVLimitCapital>(objectLmgCarInsuredAVLimitCapitalToString);


            string objectLmgCarInsuredAVModelCapitalToString = @"{""ModelCapital"":" + Convert.ToString(ObjectLmgCarInsuredAV.MODEL_CAPITAL) + "}";

            CarInsuredAVModelCapital carInsuredModelCapital = JsonConvert.DeserializeObject<CarInsuredAVModelCapital>(objectLmgCarInsuredAVModelCapitalToString);


            string objectLmgCarInsuredAVModelCodeCapitalToString = @"{""ModelCodeCapital"":" + Convert.ToString(ObjectLmgCarInsuredAV.MODEL_CODE_CAPITAL) + "}";

            CarInsuredAVModelCodeCapital carInsuredModelCodeCapital = JsonConvert.DeserializeObject<CarInsuredAVModelCodeCapital>(objectLmgCarInsuredAVModelCodeCapitalToString);


            //for (int i = 0; i < carInsuredCapital.Capital.Count; i++)
            //{
            if (carInsuredLimitCapital.LimitCapital.Count > 0)
            {
                ModelDataCar.Add(new ModelDataCar()
                {
                                                                      car_brand_value = car_brand_value
                                                                    , regis_year_value = regis_year_value 
                                                                    , model_value = car_model_value
                                                                    , sub_model_value = sub_model_value 
                                                                    , sum_Insured = sum_Insured
                                                                    //, capital_value = carInsuredCapital.Capital[i].capital_value
                                                                    , max_capital_value = carInsuredLimitCapital.LimitCapital[0].max_capital_value
                                                                    , select_capital_value = carInsuredLimitCapital.LimitCapital[0].select_capital_value
                                                                    , group_car = carInsuredModelCapital.ModelCapital[0].Group_car
                                                                    , capacity = carInsuredModelCapital.ModelCapital[0].capacity
                                                                    , weight = carInsuredModelCapital.ModelCapital[0].weight
                                                                    , body = carInsuredModelCapital.ModelCapital[0].body
                                                                    , passenger = carInsuredModelCapital.ModelCapital[0].passenger
                                                                    , motor_code = carInsuredModelCodeCapital.ModelCodeCapital[0].motor_code
                                                                    , motor_description = carInsuredModelCodeCapital.ModelCodeCapital[0].motor_description
                                                                    , message_in_policy = carInsuredModelCodeCapital.ModelCodeCapital[0].message_in_policy
                                                                    , body_type = carInsuredModelCodeCapital.ModelCodeCapital[0].body_type
                                                                    , auto_type = carInsuredModelCodeCapital.ModelCodeCapital[0].auto_type
                            
                });


            //}

            }

            return ModelDataCar;

        }

        public CarModelDescription GetModelDescription(th.co.lmginsurance.ebizuat.Service1 service1, string car_brand_value, string regis_year_value,string car_model_value)
        {
            string getJsonCarModelDescription = service1.WSGetModelDescription("Y", car_brand_value, regis_year_value, car_model_value);

            ObjectCarModelDescription ObjectLmgCarModelDescription = JsonConvert.DeserializeObject<ObjectCarModelDescription>(getJsonCarModelDescription);

            string objectLmgCarModelToString = @"{""data"":" + Convert.ToString(ObjectLmgCarModelDescription.SUB_MODEL) + "}";

            CarModelDescription carModelDescription = JsonConvert.DeserializeObject<CarModelDescription>(objectLmgCarModelToString);

            return carModelDescription;
        }

        public CarModel GetCarModel(th.co.lmginsurance.ebizuat.Service1 service1,string car_brand_value,string regis_year_value)
        {
            string getJsonCarModel = service1.WSGetModel("Y", car_brand_value, regis_year_value);

            ObjectCarModel objectLmgCarModel = JsonConvert.DeserializeObject<ObjectCarModel>(getJsonCarModel);

            string objectLmgCarModelToString = @"{""data"":" + Convert.ToString(objectLmgCarModel.CAR_MODEL) + "}";

            CarModel carModel = JsonConvert.DeserializeObject<CarModel>(objectLmgCarModelToString);

            return carModel;
        }

        private CarRegisYear GetCarRegisYear(th.co.lmginsurance.ebizuat.Service1 service1, string car_brand_value)
        {
            string getJsonRegisYear = service1.WSGetMakeYear("N", car_brand_value);

            ObjectRegisYear ObjectLmgCarRegisYear = JsonConvert.DeserializeObject<ObjectRegisYear>(getJsonRegisYear);

            string objectLmgCarRegisYearToString = @"{""data"":" + Convert.ToString(ObjectLmgCarRegisYear.REGIS_YEAR) + "}";

            CarRegisYear carRegisYear = JsonConvert.DeserializeObject<CarRegisYear>(objectLmgCarRegisYearToString);

            return carRegisYear;
        }

        public CarBrand GetCarBrand(th.co.lmginsurance.ebizuat.Service1 service1)
        {
            string getJsonCarBrand = service1.WSGetMake("Y");

            ObjectCarBrand objectLmgCarBrand = JsonConvert.DeserializeObject<ObjectCarBrand>(getJsonCarBrand);

            string objectLmgCarToString = @"{""data"":" + Convert.ToString(objectLmgCarBrand.CAR_BRAND) + "}";

            CarBrand carBrand = JsonConvert.DeserializeObject<CarBrand>(objectLmgCarToString);

            return carBrand;
        }
    }

    #region CarBrand
    class ObjectCarBrand
    {
        public object RESULT { get; set; }
        public object CAR_BRAND { get; set; }
    }
    public class CarBrand
    {
        public List<CarBrandProperty> data { get; set; }
    }
    public class CarBrandProperty
    {
        [JsonProperty("car_brand_value")]
        public string car_brand_value { get; set; }

        [JsonProperty("car_brand_name")]
        public string car_brand_name { get; set; }
    }
    #endregion

    #region RegisYear
    class ObjectRegisYear
    {
        public object RESULT { get; set; }
        public object REGIS_YEAR { get; set; }
    }

    public class CarRegisYear
    {
        public List<CarRegisYearProperty> data { get; set; }
    }

    public class CarRegisYearProperty
    {
        [JsonProperty("regis_year_value")]
        public string regis_year_value { get; set; }

        [JsonProperty("regis_year_name")]
        public string regis_year_name { get; set; }
    }
    #endregion

    #region CarModel
    class ObjectCarModel
    {
        public object RESULT { get; set; }
        public object CAR_MODEL { get; set; }
    }
    public class CarModel
    {
        public List<CarModelProperty> data { get; set; }
    }

    public class CarModelProperty
    {
        [JsonProperty("model_value")]
        public string model_value { get; set; }

        [JsonProperty("model_name")]
        public string model_name { get; set; }
    }
    #endregion

    #region CarModelDescription
    class ObjectCarModelDescription
    {
        public object RESULT { get; set; }
        public object SUB_MODEL { get; set; }
    }
    public class CarModelDescription
    {
        public List<CarModelDescriptionProperty> data { get; set; }
    }

    public class CarModelDescriptionProperty
    {
        [JsonProperty("sub_model_value")]
        public string sub_model_value { get; set; }

        [JsonProperty("sub_mode_name")]
        public string sub_mode_name { get; set; }

        [JsonProperty("Sum_Insured")]
        public string Sum_Insured { get; set; }
    }
    #endregion

    #region CarInsuredAv
    class ObjectCarInsuredAV
    {
        public object RESULT { get; set; }
        public object INSURE_CAPITAL { get; set; }
        public object LIMIT_CAPITAL { get; set; }
        public object MODEL_CAPITAL { get; set; }
        public object MODEL_CODE_CAPITAL { get; set; }
    }

    public class CarInsuredAVCapital
    {
        public List<CarInsuredAVCapitalProperty> Capital { get; set; }
    }

    public class CarInsuredAVCapitalProperty
    {
        [JsonProperty("capital_value")]
        public decimal capital_value { get; set; }

        [JsonProperty("capital_name")]
        public string capital_name { get; set; }
    }

    public class CarInsuredAVLimitCapital
    {
        public List<CarInsuredAVLimitCapitalProperty> LimitCapital { get; set; }
    }

    public class CarInsuredAVLimitCapitalProperty
    {
        [JsonProperty("max_capital_value")]
        public decimal max_capital_value { get; set; }

        [JsonProperty("select_capital_value")]
        public decimal select_capital_value { get; set; }
    }

    public class CarInsuredAVModelCapital
    {
        public List<CarInsuredAVModelCapitalProperty> ModelCapital { get; set; }
    }

    public class CarInsuredAVModelCapitalProperty
    {
        [JsonProperty("Group_car")]
        public string Group_car { get; set; }

        [JsonProperty("capacity")]
        public decimal capacity { get; set; }

        [JsonProperty("weight")]
        public decimal weight { get; set; }

        [JsonProperty("body")]
        public string body { get; set; }

        [JsonProperty("passenger")]
        public decimal passenger { get; set; }
    }

    public class CarInsuredAVModelCodeCapital
    {
        public List<CarInsuredAVModelCodeCapitalProperty> ModelCodeCapital { get; set; }
    }

    public class CarInsuredAVModelCodeCapitalProperty
    {
        [JsonProperty("motor_code")]
        public string motor_code { get; set; }

        [JsonProperty("motor_description")]
        public string motor_description { get; set; }

        [JsonProperty("message_in_policy")]
        public string message_in_policy { get; set; }

        [JsonProperty("body_type")]
        public string body_type { get; set; }

        [JsonProperty("auto_type")]
        public string auto_type { get; set; }
    }
#endregion

    public class ModelDataCar
    {
        public string car_brand_value { get; set; }

        public string regis_year_value { get; set; }

        public string model_value { get; set; }

        public string sub_model_value { get; set; }

        public string sum_Insured { get; set; }

        public decimal capital_value { get; set; }

        public decimal max_capital_value { get; set; }

        public decimal select_capital_value { get; set; }

        public string group_car { get; set; }

        public decimal capacity { get; set; }

        public decimal weight { get; set; }

        public string body { get; set; }

        public decimal passenger { get; set; }

        public string motor_code { get; set; }

        public string motor_description { get; set; }

        public string message_in_policy { get; set; }

        public string body_type { get; set; }

        public string auto_type { get; set; }
    }


}