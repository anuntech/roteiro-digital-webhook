const express = require("express");
const app = express();
const { config } = require("dotenv");
const port = 3000;

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const WHIRLPOOL_TABLE_NAME = process.env["WHIRLPOOL_TABLE_NAME"];
const WHIRLPOOL_FORM_ID = parseInt(process.env["WHIRLPOOL_FORM_ID"], 10);
const WHIRLPOOL_COMPANY_ID = parseInt(process.env["WHIRLPOOL_COMPANY_ID"], 10);

const ANUNTECH_TABLE_NAME = process.env["ANUNTECH_TABLE_NAME"];
const ANUNTECH_FORM_ID = parseInt(process.env["ANUNTECH_FORM_ID"], 10);
const ANUNTECH_COMPANY_ID = parseInt(process.env["ANUNTECH_COMPANY_ID"], 10);

const knex = require("knex")({
  client: "mysql2",
  connection: process.env.DATABASE_URL,
});

async function processWhirlpool(data) {
  const { id, entity_id, entity, updated_at: updatedAt, fields } = data;

  let created_at = entity?.scheduled_for;
  let appliance_id = null;
  let sku_code = null;
  let purchase_date = null;
  let invoice_number = null;
  let invoice_photo = null;
  let engineering_version = null;
  let appliance_serial_number = null;
  let label_photo = null;
  let consumer_id = null;
  let cell_phone_number = null;
  let email = null;
  let responsible_type = null;
  let responsible_name = null;
  let responsible_doc_number = null;
  let order_id = null;
  let confirmed_defect = null;
  let confirmed_defect2 = null;
  let failure_photo1 = null;
  let failure_photo2 = null;
  let failure_photo3 = null;
  let failure_photo4 = null;
  let failure_photo5 = null;
  let technical_report = null;
  let signature = null;
  let final_status_id = null;
  let final_reason_id = null;
  let rescheduling_date = null;
  let rescheduling_period = null;
  let parts_price = null;
  let labor_price = null;
  let visit_price = null;
  let displacement_price = null;
  let total_price = null;
  let received_price = null;
  let payment_method = null;
  let notes = null;
  let service_warranty = null;
  let parts_warranty = null;
  let approved = null;

  for (const field of fields) {
    if (field.checklist_form_field.checklist_form_id === WHIRLPOOL_FORM_ID) {
      continue;
    }

    console.log(fields);
    if (field.checklist_form_field?.name == "appliance.applianceId") {
      appliance_id = field.value;
    }
    if (field.checklist_form_field?.name == "appliance.skuCode") {
      sku_code = field.value;
    }
    if (field.checklist_form_field?.name == "appliance.purchaseDate") {
      purchase_date = field.value;
    }
    if (field.checklist_form_field?.name == "appliance.invoiceNumber") {
      invoice_number = field.value;
    }
    if (field.checklist_form_field?.name == "appliance.invoicePhoto") {
      invoice_photo = field.value;
    }
    if (field.checklist_form_field?.name == "appliance.engineeringVersion") {
      engineering_version = field.value;
    }
    if (field.checklist_form_field?.name == "appliance.applianceSerialNumber") {
      appliance_serial_number = field.value;
    }
    if (field.checklist_form_field?.name == "appliance.labelPhoto") {
      label_photo = field.value;
    }
    if (field.checklist_form_field?.name == "consumer.consumerId") {
      consumer_id = field.value;
    }
    if (field.checklist_form_field?.name == "consumer.cellPhoneNumber") {
      cell_phone_number = field.value;
    }
    if (field.checklist_form_field?.name == "consumer.email") {
      email = field.value;
    }
    if (field.checklist_form_field?.name == "consumer.responsibleType") {
      responsible_type = field.value;
    }
    if (field.checklist_form_field?.name == "consumer.responsibleName") {
      responsible_name = field.value;
    }
    if (field.checklist_form_field?.name == "consumer.responsibleDocNumber") {
      responsible_doc_number = field.value;
    }
    if (field.checklist_form_field?.name == "order.orderId") {
      order_id = field.value;
    }
    if (field.checklist_form_field?.name == "order.confirmedDefect") {
      confirmed_defect = field.value;
    }
    if (field.checklist_form_field?.name == "order.confirmedDefect2") {
      confirmed_defect2 = field.value;
    }
    if (field.checklist_form_field?.name == "order.failurePhoto1") {
      failure_photo1 = field.value;
    }
    if (field.checklist_form_field?.name == "order.failurePhoto2") {
      failure_photo2 = field.value;
    }
    if (field.checklist_form_field?.name == "order.failurePhoto3") {
      failure_photo3 = field.value;
    }
    if (field.checklist_form_field?.name == "order.failurePhoto4") {
      failure_photo4 = field.value;
    }
    if (field.checklist_form_field?.name == "order.failurePhoto5") {
      failure_photo5 = field.value;
    }
    if (field.checklist_form_field?.name == "order.technicalReport") {
      technical_report = field.value;
    }
    if (field.checklist_form_field?.name == "order.signature") {
      signature = field.value;
    }
    if (field.checklist_form_field?.name == "order.finalStatusId") {
      final_status_id = field.value;
    }
    if (field.checklist_form_field?.name == "order.finalReasonId") {
      final_reason_id = field.value;
    }
    if (field.checklist_form_field?.name == "order.reschedulingDate") {
      rescheduling_date = new Date(field.value);
    }
    if (field.checklist_form_field?.name == "order.reschedulingPeriod") {
      rescheduling_period = field.value;
    }
    if (field.checklist_form_field?.name == "proposal.partsPrice") {
      parts_price = parseFloat(field.value);
    }
    if (field.checklist_form_field?.name == "proposal.laborPrice") {
      labor_price = parseFloat(field.value);
    }
    if (field.checklist_form_field?.name == "proposal.visitPrice") {
      visit_price = parseFloat(field.value);
    }
    if (field.checklist_form_field?.name == "proposal.displacementPrice") {
      displacement_price = parseFloat(field.value);
    }
    if (field.checklist_form_field?.name == "proposal.totalPrice") {
      total_price = parseFloat(field.value);
    }
    if (field.checklist_form_field?.name == "proposal.receivedPrice") {
      received_price = parseFloat(field.value);
    }
    if (field.checklist_form_field?.name == "proposal.paymentMethod") {
      payment_method = field.value;
    }
    if (field.checklist_form_field?.name == "proposal.notes") {
      notes = field.value;
    }
    if (field.checklist_form_field?.name == "proposal.serviceWarranty") {
      service_warranty = field.value;
    }
    if (field.checklist_form_field?.name == "proposal.partsWarranty") {
      parts_warranty = field.value;
    }
    if (field.checklist_form_field?.name == "proposal.approved") {
      approved = field.value;
    }
  }

  await knex
    .insert({
      id,
      entity_id,
      company_id: WHIRLPOOL_COMPANY_ID,
      appliance_id,
      sku_code,
      purchase_date,
      invoice_number,
      invoice_photo,
      engineering_version,
      appliance_serial_number,
      label_photo,
      consumer_id,
      cell_phone_number,
      email,
      responsible_type,
      responsible_name,
      responsible_doc_number,
      order_id,
      confirmed_defect,
      confirmed_defect2,
      failure_photo1,
      failure_photo2,
      failure_photo3,
      failure_photo4,
      failure_photo5,
      technical_report,
      signature,
      final_status_id,
      final_reason_id,
      rescheduling_date,
      rescheduling_period,
      parts_price,
      labor_price,
      visit_price,
      displacement_price,
      total_price,
      received_price,
      payment_method,
      notes,
      service_warranty,
      parts_warranty,
      approved,
      created_at,
      updated_at: updatedAt,
    })
    .into(WHIRLPOOL_TABLE_NAME)
    .onConflict()
    .merge();
}

async function processAnuntech(data) {
  const { id, entity_id, entity, updated_at: updatedAt, fields } = data;

  let order_id = entity?.code;
  let technical = entity?.driver_id;
  let order_classification = null;
  let service_order_status = null;
  let parts_value = null;
  let labor_value = null;
  let visit_fee = null;
  let received_value = null;
  let advance_revenue = null;
  let revenue_deduction = null;
  let payment_method = null;
  let payment_condition = null;
  let notes = null;
  let payment_receipt = null;
  let created_at = entity?.scheduled_for;

  for (const field of fields) {
    if (field.checklist_form_field.checklist_form_id === ANUNTECH_FORM_ID) {
      continue;
    }

    if (field.checklist_form_field_id == 5834) {
      order_classification = field.value;
    }
    if (field.checklist_form_field_id == 5818) {
      service_order_status = field.value;
    }
    if (field.checklist_form_field_id == 5824) {
      parts_value = parseFloat(field.value);
    }
    if (field.checklist_form_field_id == 5825) {
      labor_value = parseFloat(field.value);
    }
    if (field.checklist_form_field_id == 5826) {
      visit_fee = parseFloat(field.value);
    }
    if (field.checklist_form_field_id == 5828) {
      received_value = parseFloat(field.value);
    }
    if (field.checklist_form_field_id == 5917) {
      advance_revenue = parseFloat(field.value);
    }
    if (field.checklist_form_field_id == 5918) {
      revenue_deduction = parseFloat(field.value);
    }
    if (field.checklist_form_field_id == 5823) {
      payment_method = field.value;
    }
    if (field.checklist_form_field_id == 5919) {
      payment_condition = field.value;
    }
    if (field.checklist_form_field_id == 5816) {
      notes = field.value;
    }
    if (field.checklist_form_field_id == 16323) {
      payment_receipt = field.file_url;
    }
  }

  await knex
    .insert({
      id,
      order_id,
      entity_id,
      technical,
      company_id: ANUNTECH_COMPANY_ID,
      order_classification,
      service_order_status,
      parts_value,
      labor_value,
      visit_fee,
      received_value,
      advance_revenue,
      revenue_deduction,
      payment_method,
      payment_condition,
      notes,
      payment_receipt,
      created_at,
      updated_at: updatedAt,
    })
    .into(ANUNTECH_TABLE_NAME)
    .onConflict()
    .merge();
}

app.post("/data", async (req, res) => {
  const body = req.body;
  const data = body.payload;

  await Promise.all([processWhirlpool(data), processAnuntech(data)]);

  res.status(200).json({
    message: "Data Saved successfully!",
  });
});

app.listen(port, async () => {
  await knex.raw(
    `
		CREATE TABLE IF NOT EXISTS ${WHIRLPOOL_TABLE_NAME} (
			id VARCHAR(100) PRIMARY KEY,
			entity_id INT,
			company_id INT,
			appliance_id TEXT,
			sku_code TEXT,
			purchase_date TEXT,
			invoice_number TEXT,
			invoice_photo TEXT,
			engineering_version TEXT,
			appliance_serial_number TEXT,
			label_photo TEXT,
			consumer_id TEXT,
			cell_phone_number TEXT,
			email TEXT,
			responsible_type TEXT,
			responsible_name TEXT,
			responsible_doc_number TEXT,
			order_id TEXT,
			confirmed_defect TEXT,
			confirmed_defect2 TEXT,
			failure_photo1 TEXT,
			failure_photo2 TEXT,
			failure_photo3 TEXT,
			failure_photo4 TEXT,
			failure_photo5 TEXT,
			technical_report TEXT,
			signature TEXT,
			final_status_id TEXT,
			final_reason_id TEXT,
			rescheduling_date TIMESTAMP,
			rescheduling_period TEXT,
			parts_price INT, 
			labor_price INT, 
			visit_price INT, 
			displacement_price INT, 
			total_price INT, 
			received_price INT, 
			payment_method TEXT,
			notes TEXT,
			service_warranty TEXT,
			parts_warranty TEXT,
			approved TEXT,
			created_at TIMESTAMP,
			updated_at TIMESTAMP
		)
	`,
    []
  );
  console.log("created");

  console.log("create anuntech table");
  await knex.raw(
    `
		CREATE TABLE IF NOT EXISTS ${ANUNTECH_TABLE_NAME} (
			id VARCHAR(100) PRIMARY KEY,
			entity_id INT,
			company_id INT,
			order_classification TEXT,
			service_order_status TEXT,
			parts_value INT, 
			labor_value INT, 
			visit_fee INT, 
			received_value INT, 
			advance_revenue INT, 
			revenue_deduction INT, 
			payment_method TEXT,
			payment_condition TEXT,
			notes TEXT,
			order_id TEXT,
			payment_receipt TEXT,
			created_at TIMESTAMP,
			updated_at TIMESTAMP,
			technical TEXT
		)
	`,
    []
  );
  console.log(`Server running at http://localhost:${port}`);
});
