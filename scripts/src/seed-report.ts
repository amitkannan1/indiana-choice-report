import { db, reportMetadataTable, reportSectionsTable, reportTablesTable, reportStatsTable } from "@workspace/db";

async function seed() {
  console.log("Seeding report data...");

  // Clear existing data
  await db.delete(reportStatsTable);
  await db.delete(reportTablesTable);
  await db.delete(reportSectionsTable);
  await db.delete(reportMetadataTable);

  // Insert metadata
  await db.insert(reportMetadataTable).values({
    reportTitle: "Indiana Choice Scholarship Program Annual Report",
    reportYear: "2024-2025",
    reportDescription: "This report incorporates data from both the 2023-2024 and 2024-2025 school years, building upon the initial release in 2014. The Choice Scholarship Program provides Choice Scholarships to students who meet specific statutory criteria, used to offset the cost of tuition and fees at participating Choice schools for eligible families.",
    publishedDate: "2025",
  });

  // Insert sections
  await db.insert(reportSectionsTable).values([
    {
      key: "overview",
      title: "Indiana School Choice Scholarship Program History",
      content: `This latest iteration of the Choice Scholarship Program Annual Report incorporates data from both the 2023-2024 and 2024-2025 school years, building upon the initial release in 2014. Since certain data will not be finalized until June 2025, some 2024-2025 information will be reflected in the 2025-2026 report. Prior Choice Scholarship Program Annual Reports can be found on the Indiana Department of Education's (IDOE's) Indiana Choice Scholarship Program webpage.

Part of this report includes an overview of Indiana's current Choice Scholarship Program, which was passed as part of House Enrolled Act (HEA) 1003 (2011) (i.e., Public Law 92 [2011]). The Choice Scholarship Program provides Choice Scholarships to students who meet specific statutory criteria. These scholarships are used to offset and assist with the cost of tuition and fees at participating Choice schools for eligible families.

The legal foundation for Indiana's Choice Scholarship Program can be found in Indiana Code (IC) 20-51 and 512 Indiana Administrative Code (IAC) 4, or on IDOE's Indiana Choice Scholarship Program webpage.`,
      sectionOrder: 1,
    },
    {
      key: "eligibility",
      title: "Eligibility",
      content: `As stated above, students must satisfy statutory eligibility requirements to participate in Indiana's Choice Scholarship Program.`,
      sectionOrder: 2,
    },
    {
      key: "eligibility-student",
      title: "Student Eligibility Criteria",
      content: `All students must satisfy the following two requirements:

1. Have legal settlement in Indiana; and
2. Be at least five years of age and less than 22 years of age on October 1 of the school year.

After meeting the above criteria, students must satisfy the requirement of income eligibility criteria, which is 400% of the household income, to qualify for the Federal Free or Reduced Lunch Program.`,
      sectionOrder: 3,
      parentKey: "eligibility",
    },
    {
      key: "eligibility-income",
      title: "Income Eligibility Criteria",
      content: `The income criteria to participate in the Choice Scholarship Program for the 2024-2025 school year are linked to the Federal Free or Reduced Price Lunch Program income guidelines.

The 90% award amounts are percentages of the tuition support amounts that the respective student's public school corporation of legal settlement would receive if the student enrolled in a public school in that corporation.`,
      sectionOrder: 4,
      parentKey: "eligibility",
    },
    {
      key: "participation",
      title: "Participation",
      content: `Beginning with the 2019-2020 school year, a second Choice student application period was put in place. The original application, period one, is open annually from March 1 to September 1. The second application, period two, is open from November 1 to January 15. For purposes of the Choice Scholarship Program Annual Report, a school is only counted as participating if they have one or more students receive payment, and students are only counted as participating if they receive a payment during the 2024-2025 school year.

The 2024-2025 school year saw growth in the total number of participating students while also having a marginal decrease in the number of period two participating students. The 2023-2024 Choice Scholarship Program had 68,766 participating students in period one, 1,329 participating students in period two, and 357 participating schools. The 2024-2025 school year saw an increase in participating schools to 373, the most participating schools of any year of the Choice Scholarship Program. There were 74,743 participating students in period one and 1,324 participating students in period two, which increased the total number of participating students for the 2024-2025 school year to 76,067.

The period two application was established, by law, to provide an opportunity for eligible students to transfer to a new Choice school and receive a Choice Scholarship after the September 1 deadline.`,
      sectionOrder: 5,
    },
    {
      key: "participation-grade",
      title: "Participation by Grade Level",
      content: `The count of program participants by grade level, as well as the percent each grade level accounted for in terms of program participation each year, are detailed in Table 7. From the 2023-2024 school year to the 2024-2025 school year, no grade level increased or decreased by more than 0.37% as a percentage of participating students in the Choice Scholarship Program. The largest decrease, 0.19%, was found in the sixth grade. The largest increase, 0.37%, was found in the eleventh grade.

The removal of eligibility tracks in the 2023-2024 school year led to a drastic increase in kindergarten participation last year. This increase was reflected in the graph last year but 2024-2025 now reflects a similar distribution to 2023-2024.`,
      sectionOrder: 6,
      parentKey: "participation",
    },
    {
      key: "participation-gender",
      title: "Participation by Gender",
      content: `In each year of the program, slightly more female students have participated than male students. The 2024-2025 school year has shown a slight increase in the percentage of female students and a slight decrease in male students. The changes in each year are marginal and female students still make up just over 50% of the participating students in the Choice Scholarship Program. Overall, the percentages for male and female participating students are nearly 50% each.

However, period two does show a disproportionate difference from period one and total with 52.11% female and 48.89% male student participation. From the 2023-2024 school year to the 2024-2025 school year, there was a 0.20% increase in female students and 0.20% decrease in male students in total.`,
      sectionOrder: 7,
      parentKey: "participation",
    },
    {
      key: "participation-ethnicity",
      title: "Participation by Ethnicity",
      content: `Black ethnicity, White ethnicity, and Multiracial (two or more races) ethnicity were the only ethnicities that saw a decrease from 2023-2024 to 2024-2025 with a decrease of 0.12%, 0.05% and 0.05%, respectively. Hispanic ethnicity and of any race that makes up the second largest group of students saw the largest increase from 2023-2024 to 2024-2025 at 0.14%. All other ethnicities increased by no more than 0.08% each.`,
      sectionOrder: 8,
      parentKey: "participation",
    },
    {
      key: "participation-geographic",
      title: "Participation by Geographic Area",
      content: `Each public school corporation in Indiana is categorized as one of four geographic types – metropolitan, suburban, rural, or town. The geographic area for each student is determined by the public school corporation where the student lives. Most students live in a metropolitan area; however, this area saw the only decrease from the 2023-2024 school year to the 2024-2025 school year at 1.07%. Suburban, rural, and town areas experienced an increase from the 2023-2024 school year to the 2024-2025 school year of 0.60%, 0.22%, and 0.25% respectively.`,
      sectionOrder: 9,
      parentKey: "participation",
    },
    {
      key: "participation-prior",
      title: "Participation by Prior Indiana Public School Attendance",
      content: `For the 2024-2025 school year, roughly 30% of students participating in the Choice Scholarship Program have a record of previously attending an Indiana public school. The percentage of students with a record of previously attending an Indiana public school was at roughly 33% for the 2023-2024 school year. This decrease is likely due to students who were already enrolled at their Choice school now qualifying without prior attendance at an Indiana public school.

The data shows a trend of fewer participating students ever attending an Indiana public school.`,
      sectionOrder: 10,
      parentKey: "participation",
    },
    {
      key: "special-education",
      title: "Special Education",
      content: `During the 2013 legislative session of the Indiana General Assembly, legislation was passed allowing non-public schools to be the designated special education service provider for eligible Choice Scholarship students. Choice schools that are selected as an eligible student's special education service provider and agree to provide associated services may receive state special education funding to meet these student's needs. Prior to this legislation, non-public schools were not eligible to receive state special education funding for any eligible special education student.

At the time of application, the parent/guardian of a Choice student who qualifies to receive special education services must designate the Choice school or the public school corporation as the special education service provider. If the Choice school is selected, they are eligible to receive state special education funding for the student.

For the 2024-2025 school year, 5,553 participating Choice Scholarship students were eligible for special education as reported on their application. Of these students, 964, or 17.36%, selected their Choice school as the special education service provider while the other 4,589, or 82.64%, selected the public school corporation.

For the 2024-2025 school year, 88 Choice schools were selected as the special education service provider for at least one eligible Choice Scholarship student, but only 68 of the schools received a payment for at least one student.`,
      sectionOrder: 11,
    },
    {
      key: "retention",
      title: "Retention",
      content: `Participating Choice schools are required to report a Choice Scholarship student who withdraws from the Choice school to IDOE within five days of the student's exit date.`,
      sectionOrder: 12,
    },
    {
      key: "retention-during",
      title: "Participant Retention During the School Year",
      content: `Table 14 provides the count and percentage of participating students who exited a Choice school prior to the last day of school. Note: The 2024-2025 information is not available at this time. It will be included in next year's updated report.`,
      sectionOrder: 13,
      parentKey: "retention",
    },
    {
      key: "retention-between",
      title: "Participant Retention Between School Years",
      content: `Of the 76,067 Choice Scholarship students who participated in the 2024-2025 Choice Scholarship Program, 58,433 of those students participated in the 2023-2024 school year. The 76.82% retention rate from 2023-2024 to 2024-2025 shows a roughly 13% increase from 2022-2023 to 2023-2024.`,
      sectionOrder: 14,
      parentKey: "retention",
    },
    {
      key: "awards",
      title: "Awards",
      content: ``,
      sectionOrder: 15,
    },
    {
      key: "awards-calculation",
      title: "Calculation of Award Amount",
      content: `Currently, the value of the Choice Scholarship is the lesser of two amounts:

1. Tuition and fees charged to the student at the eligible Choice school; or
2. An amount based off the per-student State funding for the student's public school corporation of residence, determined as follows:
   • 90% of the funding formula amount if household income is up to 400% of Federal Free or Reduced Price Lunch eligibility.

The 90% amount calculation, which uses the per-student State funding amount by public school corporation of residence for the 2024-2025 school year, was posted on IDOE's Indiana Choice Scholarship Program webpage.`,
      sectionOrder: 16,
      parentKey: "awards",
    },
    {
      key: "awards-by-type",
      title: "Awards by Type",
      content: `The award amount for a student is the lesser of their respective Choice school's tuition and fees amount entered on the applying student's application or the 90% tuition support amount for the public school corporation of legal settlement. The 90% award type increased by 15.15% and the tuition and fees award type decreased by 15.15% from the 2023-2024 school year to the 2024-2025 school year.

This increase in 90% award amounts would indicate that more Choice Scholarship eligible families are now required to pay some of their tuition and fees since the Choice Scholarship award is less than the tuition and fees amount at their Choice school.

Starting in the 2024-2025 school year, foster child status is no longer utilized as it is captured in the Choice Scholarship Eligibility System (CSES). The CSES is a database compiled of students who qualify for certain benefits from other State administered financial assistance programs.`,
      sectionOrder: 17,
      parentKey: "awards",
    },
    {
      key: "awards-grade",
      title: "Award Amount by Grade Level",
      content: `Table 21 details the total award amount of Choice Scholarship students by grade level. The amounts shown are the maximum that would be paid if every student remained enrolled for the full school year and did not receive a prorated award amount or have a refund owed; it is not the amount that has been paid. Period two award amounts are calculated to half the award amount of period one award amounts due to the Choice Scholarship only being used for half of the school year.`,
      sectionOrder: 18,
      parentKey: "awards",
    },
    {
      key: "awards-corporation",
      title: "Awards by Public School Corporation of Legal Settlement",
      content: `Table 22 details how the total choice scholarship award is distributed across the state. The award amount for 2024-2025 shows the total eligible award amount for all Choice Scholarship students by public school corporation of legal settlement. A complete listing is provided in Appendix D.`,
      sectionOrder: 19,
      parentKey: "awards",
    },
    {
      key: "awards-school",
      title: "Awards by Participating Choice School",
      content: `Table 24 provides the total award amount that all Choice Scholarship students were eligible to receive in each of the past two years of the Choice Scholarship Program. This is not the amount that is paid, but the total of all award amounts. A complete listing of the total eligible award amount by Choice school is provided in Appendix C.

The amounts shown are the maximum that would be paid if every student remained enrolled for the full school year and did not receive a prorated award amount or have a refund owed. Period two award amounts are calculated to half the award amount of period one award amounts due to the Choice Scholarship only being used for half of the school year.`,
      sectionOrder: 20,
      parentKey: "awards",
    },
    {
      key: "payments",
      title: "Choice Scholarship Payments",
      content: `Choice Scholarship award payments are made to the Choice school on the student's behalf at least once each semester. The student (if 18 years of age or older) or the student's parent or guardian signs an Endorsement Form authorizing IDOE to disburse the Choice Scholarship funds directly to the participating Choice school on behalf of the Choice student.

Indiana Code (IC) 20-51-4-6 specifies that if an eligible Choice Scholarship student enrolls in an eligible school for less than an entire school year, the Choice Scholarship provided for that school year shall be reduced on a prorated basis to reflect the shorter school term.

The information for the 2024-2025 school year will not be available until the end of the 2024-2025 school year and the data will not be published until the 2025-2026 version of the Choice Scholarship Program Annual Report.`,
      sectionOrder: 21,
    },
    {
      key: "summary",
      title: "2024-2025 Choice Student Summary",
      content: `The following summary of the "average" Choice student is based on data found within the Choice Scholarship Report. "Average" refers to where a majority of Choice students are found within each data set.

The "average" Choice student is a female student in an elementary grade level (kindergarten through fifth grade) of white ethnicity, from a metropolitan area, and a household with a size of 4.65 people and income of $102,842.66 which is under 200% of the Federal Free and Reduced Lunch Program guidelines. Due to higher tuition and fees, the "average" Choice student has an award equal to 90 percent of the tuition support amount per student at their public school corporation of legal settlement. The average award amount is $6,536.29 and the average tuition and fees amount is $8,368.64.

Additionally, the "average" Choice Scholarship student applies during the period one application, participated in the 2023-2024 Choice Scholarship Program, utilizes household size and income for income eligibility, has no record of attending an Indiana public school, and attends a Choice school within the boundaries of their corporation of legal settlement.`,
      sectionOrder: 22,
    },
    {
      key: "additional-info",
      title: "Additional Information",
      content: `Data contained in this report was provided by IDOE's Office of Information Technology. Data sources used in this report include the STN Application Center, the State Aid Application Center, Choice Scholarship Student Applications, Choice School Applications, and the Federal Poverty Guidelines. Data for the Choice Scholarship Program Annual Report is specifically for the context of this report.

Any questions regarding the data used should be directed to choiceschool@doe.in.gov.

For additional information on the Choice Scholarship Program, visit IDOE's Indiana Choice Scholarship Program webpage.

Prior year Appendices E and F that outlined Choice student enrollment at Choice schools by public school corporation of legal settlement can now be found on IDOE's Data Center & Reports webpage under the Public Corporation Transfer Report section.

Award amounts shown in the following appendices are not actual amounts paid. The amounts shown in the appendices are the amounts for which the students were qualified and would have received if no students were withdrawn and received prorated award amounts.

For questions concerning the Choice Scholarship Program, please email choiceschool@doe.in.gov.`,
      sectionOrder: 23,
    },
  ]);

  // Insert tables
  await db.insert(reportTablesTable).values([
    {
      key: "table1-income-limits",
      title: "Table 1. Choice Scholarship Program Income Limits by Household Size",
      description: "2024-2025 School Year — 400% of Reduced Lunch Eligibility",
      headers: ["Household Size", "Annual Household Income Limit"],
      rows: [
        ["1", "$111,444.00"],
        ["2", "$151,256.00"],
        ["3", "$191,068.00"],
        ["4", "$230,880.00"],
        ["5", "$270,692.00"],
        ["6", "$310,504.00"],
        ["7", "$350,316.00"],
        ["8", "$390,128.00"],
        ["9", "$429,940.00"],
        ["10", "$469,752.00"],
      ],
      footnote: "Income levels are determined in accordance with the Income Verification Rules document. For a household size of eleven (11) or more, add $39,812.00 to the annual limit for each additional member.",
      sectionKey: "eligibility-income",
      tableOrder: 1,
    },
    {
      key: "table2-student-participation",
      title: "Table 2. Student Participation",
      description: "",
      headers: ["Year", "Application Period", "Student Count", "Change from Previous Year", "Percent Change from Previous Year"],
      rows: [
        ["2023-2024", "Period One", "68,766", "16,152", "30.70%"],
        ["2023-2024", "Period Two", "1,329", "681", "105.09%"],
        ["2023-2024", "Total", "70,095", "16,833", "31.60%"],
        ["2024-2025", "Period One", "74,743", "5,977", "8.69%"],
        ["2024-2025", "Period Two", "1,324", "-5", "-0.38%"],
        ["2024-2025", "Total", "76,067", "5,972", "8.52%"],
      ],
      sectionKey: "participation",
      tableOrder: 2,
    },
    {
      key: "table3-period2-applicant-types",
      title: "Table 3. Period Two Participating Student Applicant Types",
      headers: ["Year", "New Applicants", "Transfer Applicants", "Total"],
      rows: [
        ["2023-2024", "1,329", "109", "1,438"],
        ["2024-2025", "1,324", "158", "1,482"],
      ],
      sectionKey: "participation",
      tableOrder: 3,
    },
    {
      key: "table4-period2-transfer-types",
      title: "Table 4. Period Two Participating Student Transfer Types",
      description: "With 137 students changing schools from period one to period two, this means only 9.24% of period two participants and 0.18% of students are utilizing the period two application as it was intended.",
      headers: ["Year", "Same School", "Different School", "Total"],
      rows: [
        ["2023-2024", "10", "99", "109"],
        ["2024-2025", "21", "137", "158"],
      ],
      sectionKey: "participation",
      tableOrder: 4,
    },
    {
      key: "table5-school-participation",
      title: "Table 5. School Participation",
      headers: ["Year", "School Count", "Change from Previous Year", "Percent Change from Previous Year"],
      rows: [
        ["2023-2024", "357", "14", "4.08%"],
        ["2024-2025", "373", "16", "4.48%"],
      ],
      sectionKey: "participation",
      tableOrder: 5,
    },
    {
      key: "table6a-statewide-enrollment-count",
      title: "Table 6a. Count of Statewide Student Enrollment by School Type",
      footnote: "* Includes only accredited non-public schools that report to the Indiana Department of Education.",
      headers: ["Year", "Traditional Public", "Public Charter", "Non-Public (Excl. Choice)*", "Choice", "Other", "Total"],
      rows: [
        ["2023-2024", "978,458", "52,403", "23,846", "68,766", "1,902", "1,125,375"],
        ["2024-2025", "982,208", "55,919", "24,326", "74,743", "2,063", "1,139,259"],
      ],
      sectionKey: "participation",
      tableOrder: 6,
    },
    {
      key: "table6b-statewide-enrollment-percent",
      title: "Table 6b. Percent of Statewide Student Enrollment by School Type",
      footnote: "* Includes only accredited non-public schools that report to the Indiana Department of Education.",
      headers: ["Year", "Traditional Public", "Public Charter", "Non-Public (Excl. Choice)*", "Choice", "Other", "Total"],
      rows: [
        ["2023-2024", "86.94%", "4.66%", "2.12%", "6.11%", "0.17%", "100.00%"],
        ["2024-2025", "86.21%", "4.91%", "2.14%", "6.56%", "0.18%", "100.00%"],
      ],
      sectionKey: "participation",
      tableOrder: 7,
    },
    {
      key: "table7-participation-grade",
      title: "Table 7. Participation by Grade Level",
      headers: ["Grade", "2023-2024 Period One", "2023-2024 Period Two", "2023-2024 Total", "2024-2025 Period One", "2024-2025 Period Two", "2024-2025 Total"],
      rows: [
        ["KG", "6,657", "140", "6,797", "7,276", "134", "7,410"],
        ["1", "6,380", "124", "6,504", "7,060", "105", "7,165"],
        ["2", "6,306", "117", "6,423", "6,771", "107", "6,878"],
        ["3", "6,099", "110", "6,209", "6,690", "97", "6,787"],
        ["4", "5,956", "120", "6,076", "6,455", "87", "6,542"],
        ["5", "5,906", "85", "5,991", "6,350", "97", "6,447"],
        ["6", "5,777", "98", "5,875", "6,141", "88", "6,229"],
        ["7", "5,451", "103", "5,554", "5,856", "90", "5,946"],
        ["8", "5,061", "96", "5,157", "5,510", "72", "5,582"],
        ["9", "4,357", "102", "4,459", "4,635", "110", "4,745"],
        ["10", "4,113", "99", "4,212", "4,359", "115", "4,474"],
        ["11", "3,502", "82", "3,584", "4,080", "92", "4,172"],
        ["12+", "3,201", "53", "3,254", "3,560", "130", "3,690"],
        ["Total", "68,766", "1,329", "70,095", "74,743", "1,324", "76,067"],
      ],
      sectionKey: "participation-grade",
      tableOrder: 8,
    },
    {
      key: "table8a-gender-count",
      title: "Table 8a. Count of Participation by Gender",
      headers: ["Year", "Application Period", "Female", "Male", "Total"],
      rows: [
        ["2023-2024", "Period One", "34,824", "33,942", "68,766"],
        ["2023-2024", "Period Two", "668", "661", "1,329"],
        ["2023-2024", "Total", "35,492", "34,603", "70,095"],
        ["2024-2025", "Period One", "37,976", "36,767", "74,743"],
        ["2024-2025", "Period Two", "690", "634", "1,324"],
        ["2024-2025", "Total", "38,666", "37,401", "76,067"],
      ],
      sectionKey: "participation-gender",
      tableOrder: 9,
    },
    {
      key: "table8b-gender-percent",
      title: "Table 8b. Percent of Participation by Gender",
      headers: ["Year", "Application Period", "Female", "Male", "Total"],
      rows: [
        ["2023-2024", "Period One", "50.64%", "49.36%", "100.00%"],
        ["2023-2024", "Period Two", "50.26%", "49.74%", "100.00%"],
        ["2023-2024", "Total", "50.63%", "49.37%", "100.00%"],
        ["2024-2025", "Period One", "50.81%", "49.19%", "100.00%"],
        ["2024-2025", "Period Two", "52.11%", "47.89%", "100.00%"],
        ["2024-2025", "Total", "50.83%", "49.17%", "100.00%"],
      ],
      sectionKey: "participation-gender",
      tableOrder: 10,
    },
    {
      key: "table9-ethnicity",
      title: "Table 9. Participation by Ethnicity",
      headers: ["Ethnicity", "2023-2024 Period One", "2023-2024 Period Two", "2023-2024 Total", "2024-2025 Period One", "2024-2025 Period Two", "2024-2025 Total"],
      rows: [
        ["American Indian / Alaskan Native", "85", "3", "88", "89", "1", "90"],
        ["Black", "6,054", "213", "6,267", "6,454", "260", "6,714"],
        ["Asian", "2,736", "52", "2,788", "3,014", "75", "3,089"],
        ["Hispanic Ethnicity and of any race", "12,008", "185", "12,193", "13,127", "208", "13,335"],
        ["White", "44,309", "788", "45,097", "48,211", "690", "48,901"],
        ["Multiracial (two or more races)", "3,513", "81", "3,594", "3,776", "88", "3,864"],
        ["Native Hawaiian or Other Pacific Islander", "61", "7", "68", "72", "2", "74"],
        ["Total", "68,766", "1,329", "70,095", "74,743", "1,324", "76,067"],
      ],
      sectionKey: "participation-ethnicity",
      tableOrder: 11,
    },
    {
      key: "table10-geographic",
      title: "Table 10. Participation by Geographic Area",
      headers: ["Year", "Application Period", "Metropolitan", "Suburban", "Rural", "Town", "Total"],
      rows: [
        ["2023-2024", "Period One", "35,457", "21,812", "6,800", "4,697", "68,766"],
        ["2023-2024", "Period Two", "631", "409", "170", "119", "1,329"],
        ["2023-2024", "Total", "36,088", "22,221", "6,970", "4,816", "70,095"],
        ["2024-2025", "Period One", "37,655", "24,178", "7,596", "5,314", "74,743"],
        ["2024-2025", "Period Two", "698", "390", "136", "100", "1,324"],
        ["2024-2025", "Total", "38,353", "24,568", "7,732", "5,414", "76,067"],
      ],
      sectionKey: "participation-geographic",
      tableOrder: 12,
    },
    {
      key: "table11-prior-attendance",
      title: "Table 11. Participation by Student Prior Indiana Public School Attendance",
      headers: ["Year", "Application Period", "Previously Attended an Indiana Public School", "No Record of Attending an Indiana Public School", "Total"],
      rows: [
        ["2023-2024", "Period One", "22,111", "46,655", "68,766"],
        ["2023-2024", "Period Two", "668", "661", "1,329"],
        ["2023-2024", "Total", "22,779", "47,316", "70,095"],
        ["2024-2025", "Period One", "22,070", "52,673", "74,743"],
        ["2024-2025", "Period Two", "712", "612", "1,324"],
        ["2024-2025", "Total", "22,782", "53,285", "76,067"],
      ],
      sectionKey: "participation-prior",
      tableOrder: 13,
    },
    {
      key: "table12-sped-provider-count",
      title: "Table 12. Special Education Service Provider Selection Count",
      footnote: "* The public school corporation where the Choice school is located, not the student's school corporation of legal settlement",
      headers: ["Year", "Application Period", "Choice School", "Public School Corporation*", "Total"],
      rows: [
        ["2023-2024", "Period One", "904", "4,206", "5,110"],
        ["2023-2024", "Period Two", "19", "90", "109"],
        ["2023-2024", "Total", "923", "4,296", "5,219"],
        ["2024-2025", "Period One", "938", "4,513", "5,451"],
        ["2024-2025", "Period Two", "26", "76", "102"],
        ["2024-2025", "Total", "964", "4,589", "5,553"],
      ],
      sectionKey: "special-education",
      tableOrder: 14,
    },
    {
      key: "table13-sped-payments",
      title: "Table 13. Special Education Payment and Refunds (2023-2024)",
      footnote: "The 2024-2025 information is not available at this time due to outstanding refunds. 2024-2025 information will be included in the 2025-2026 Choice Annual Report.",
      headers: ["Category", "Amount"],
      rows: [
        ["Payment", "$3,143,235.66"],
        ["Refunds", "($34,059.18)"],
        ["Net Payment", "$3,109,176.48"],
      ],
      sectionKey: "special-education",
      tableOrder: 15,
    },
    {
      key: "table14-exited-students",
      title: "Table 14. Students Who Exited Choice School Before Last Day",
      footnote: "The 2024-2025 information is not available at this time. It will be included in next year's updated report.",
      headers: ["Year", "Application Period", "Total Count", "Count Who Exited", "Percent"],
      rows: [
        ["2022-2023", "Period One", "52,614", "4,475", "8.51%"],
        ["2022-2023", "Period Two", "648", "75", "11.57%"],
        ["2022-2023", "Total", "53,262", "4,550", "8.54%"],
        ["2023-2024", "Period One", "68,766", "2,243", "3.26%"],
        ["2023-2024", "Period Two", "1,329", "114", "8.58%"],
        ["2023-2024", "Total", "70,095", "2,357", "3.36%"],
      ],
      sectionKey: "retention-during",
      tableOrder: 16,
    },
    {
      key: "table15-retention-between",
      title: "Table 15. Choice Student Retention from the Previous Year",
      headers: ["Year", "Total Students", "Participated in the Previous Year", "Did Not Participate in the Previous Year", "Percent Retained from Previous Year"],
      rows: [
        ["2023-2024", "70,095", "45,059", "25,036", "64.28%"],
        ["2024-2025", "76,067", "58,433", "17,634", "76.82%"],
      ],
      sectionKey: "retention-between",
      tableOrder: 17,
    },
    {
      key: "table16-award-types",
      title: "Table 16. Count of Award Types",
      headers: ["Year", "Application Period", "90% Award", "Tuition and Fees", "Total"],
      rows: [
        ["2023-2024", "Period One", "39,485", "29,281", "68,766"],
        ["2023-2024", "Period Two", "367", "962", "1,329"],
        ["2023-2024", "Total", "39,852", "30,243", "70,095"],
        ["2024-2025", "Period One", "53,842", "20,901", "74,743"],
        ["2024-2025", "Period Two", "925", "399", "1,324"],
        ["2024-2025", "Total", "54,767", "21,300", "76,067"],
      ],
      sectionKey: "awards-by-type",
      tableOrder: 18,
    },
    {
      key: "table17-income-eligibility-types",
      title: "Table 17. Count of Income Eligibility Types",
      headers: ["Year", "Application Period", "CSES", "Foster Child", "Household Size/Income", "Total"],
      rows: [
        ["2023-2024", "Period One", "9,292", "83", "59,391", "68,766"],
        ["2023-2024", "Period Two", "139", "37", "1,153", "1,329"],
        ["2023-2024", "Total", "9,431", "120", "60,544", "70,095"],
        ["2024-2025", "Period One", "5,873", "N/A", "68,870", "74,743"],
        ["2024-2025", "Period Two", "122", "N/A", "1,202", "1,324"],
        ["2024-2025", "Total", "5,995", "N/A", "70,072", "76,067"],
      ],
      sectionKey: "awards-by-type",
      tableOrder: 19,
    },
    {
      key: "table18-household-size",
      title: "Table 18. Count by Household Size Types",
      headers: ["Year", "Application Period", "1-3", "4-6", "7-9", "10-12", "13+", "Total"],
      rows: [
        ["2023-2024", "Period One", "11,717", "42,186", "5,015", "426", "47", "59,391"],
        ["2023-2024", "Period Two", "253", "781", "105", "7", "7", "1,153"],
        ["2023-2024", "Total", "11,970", "42,967", "5,120", "433", "54", "60,544"],
        ["2024-2025", "Period One", "13,772", "48,741", "5,825", "484", "48", "68,870"],
        ["2024-2025", "Period Two", "340", "737", "118", "7", "0", "1,202"],
        ["2024-2025", "Total", "14,112", "49,478", "5,943", "491", "48", "70,072"],
      ],
      sectionKey: "awards-by-type",
      tableOrder: 20,
    },
    {
      key: "table19-household-income",
      title: "Table 19. Count of Household Income Types",
      headers: ["Year", "Application Period", "$0-$50,000", "$50,001-$100,000", "$100,001-$150,000", "$150,001-$200,000", "$200,001+", "Total"],
      rows: [
        ["2023-2024", "Period One", "13,816", "18,672", "15,484", "7,836", "3,583", "59,391"],
        ["2023-2024", "Period Two", "436", "276", "189", "136", "116", "1,153"],
        ["2023-2024", "Total", "14,252", "18,948", "15,673", "7,972", "3,699", "60,544"],
        ["2024-2025", "Period One", "15,714", "20,484", "17,667", "9,669", "5,336", "68,870"],
        ["2024-2025", "Period Two", "524", "288", "184", "107", "99", "1,202"],
        ["2024-2025", "Total", "16,238", "20,772", "17,851", "9,776", "5,435", "70,072"],
      ],
      sectionKey: "awards-by-type",
      tableOrder: 21,
    },
    {
      key: "table20-frl-percentages",
      title: "Table 20. Count of Free and Reduced Lunch Program Percentages",
      description: "2024-2025 Data: Even though income limits allow families to qualify up to 400% of the Federal Free and Reduced Lunch Program guidelines, roughly 68.03% of families have a household income of 200% or less.",
      headers: ["Year", "Application Period", "0%-100%", "100.01%-200%", "200.01%-300%", "300.01%-400%", "Total"],
      rows: [
        ["2024-2025", "Period One", "20,613", "26,144", "15,462", "6,651", "68,870"],
        ["2024-2025", "Period Two", "595", "318", "174", "115", "1,202"],
        ["2024-2025", "Total", "21,208", "26,462", "15,636", "6,766", "70,072"],
      ],
      sectionKey: "awards-by-type",
      tableOrder: 22,
    },
    {
      key: "table21-awards-grade",
      title: "Table 21. Awards by Grade",
      headers: ["Grade", "2023-2024 Period One", "2023-2024 Period Two", "2023-2024 Total", "2024-2025 Period One", "2024-2025 Period Two", "2024-2025 Total"],
      rows: [
        ["KG", "$41,013,592.47", "$417,570.51", "$41,431,162.98", "$47,392,618.81", "$440,052.76", "$47,832,671.57"],
        ["1", "$39,835,908.68", "$371,642.03", "$40,207,550.71", "$46,155,314.41", "$354,438.25", "$46,509,752.66"],
        ["2", "$39,320,528.35", "$352,120.01", "$39,672,648.36", "$44,283,931.99", "$355,603.61", "$44,639,535.60"],
        ["3", "$37,781,465.05", "$318,128.48", "$38,099,593.53", "$43,724,107.17", "$322,593.36", "$44,046,700.53"],
        ["4", "$36,972,486.59", "$365,818.35", "$37,338,304.94", "$42,093,989.29", "$284,214.59", "$42,378,203.88"],
        ["5", "$36,732,569.34", "$250,856.25", "$36,983,425.59", "$41,519,023.93", "$326,137.41", "$41,845,161.34"],
        ["6", "$36,163,420.37", "$293,830.52", "$36,457,250.89", "$40,344,312.10", "$293,092.92", "$40,637,405.02"],
        ["7", "$34,223,866.65", "$315,697.87", "$34,539,564.52", "$38,519,120.69", "$301,968.28", "$38,821,088.97"],
        ["8", "$31,655,296.97", "$281,116.91", "$31,936,413.88", "$36,036,428.08", "$231,952.03", "$36,268,380.11"],
        ["9", "$26,978,014.26", "$290,946.39", "$27,268,960.65", "$30,240,069.81", "$330,234.22", "$30,570,304.03"],
        ["10", "$25,613,481.11", "$290,946.39", "$25,904,427.50", "$28,564,337.90", "$347,748.28", "$28,912,086.18"],
        ["11", "$21,889,234.01", "$240,237.10", "$22,129,471.11", "$26,827,327.16", "$280,498.80", "$27,107,825.96"],
        ["12+", "$20,413,500.31", "$170,951.93", "$20,584,452.24", "$23,618,376.42", "$452,268.68", "$24,070,645.10"],
        ["Total", "$434,992,864.17", "$4,059,063.74", "$439,051,927.91", "$492,918,957.77", "$3,920,802.19", "$496,839,759.96"],
      ],
      sectionKey: "awards-grade",
      tableOrder: 23,
    },
    {
      key: "table24-yearly-choice-summary",
      title: "Table 24. Yearly Choice Summary",
      headers: ["Year", "Choice Schools", "Choice Students", "Choice Students as % of Statewide Enrollment", "Total Qualified Award Amount"],
      rows: [
        ["2023-2024", "357", "70,095", "6.11%", "$439,051,453.84"],
        ["2024-2025", "373", "76,067", "6.56%", "$497,195,861.37"],
      ],
      sectionKey: "awards-school",
      tableOrder: 24,
    },
    {
      key: "table25-tuition-fee-types",
      title: "Table 25. Count of Tuition and Fee Types",
      description: "Roughly 80% of participating Choice students have a tuition and fee amount of $5,001 to $10,000.",
      headers: ["Year", "Application Period", "$0-$5,000", "$5,001-$10,000", "$10,001-$15,000", "$15,001-$20,000", "$20,001+", "Total"],
      rows: [
        ["2023-2024", "Period One", "4,896", "54,512", "7,003", "1,685", "670", "68,766"],
        ["2023-2024", "Period Two", "154", "1,039", "99", "32", "5", "1,329"],
        ["2023-2024", "Total", "5,050", "55,551", "7,102", "1,717", "675", "70,095"],
        ["2024-2025", "Period One", "2,097", "59,726", "9,858", "2,234", "828", "74,743"],
        ["2024-2025", "Period Two", "26", "1,121", "132", "34", "11", "1,324"],
        ["2024-2025", "Total", "2,123", "60,847", "9,990", "2,268", "839", "76,067"],
      ],
      sectionKey: "awards-school",
      tableOrder: 25,
    },
    {
      key: "table26-choice-payment-amounts",
      title: "Table 26. Total Choice Student Eligible Payment Amount",
      footnote: "*Potential award amount all participating students are eligible to receive",
      headers: ["Payment Type", "2023-2024 Period One", "2023-2024 Period Two", "2023-2024 Total", "2024-2025 Period One", "2024-2025 Period Two", "2024-2025 Total"],
      rows: [
        ["Choice Award*", "$434,990,664.51", "$4,060,789.33", "$439,051,453.84", "$492,835,385.29", "$4,360,476.08", "$497,195,861.37"],
        ["Choice School Tuition", "$533,451,564.01", "$4,865,612.01", "$538,317,176.02", "$625,792,244.28", "$5,392,722.37", "$631,184,966.65"],
        ["Public Tuition Support", "$511,946,662.74", "$4,940,158.14", "$516,886,820.88", "$562,759,216.30", "$5,035,747.00", "$567,794,963.30"],
      ],
      sectionKey: "awards-school",
      tableOrder: 26,
    },
    {
      key: "table27-2023-24-payments",
      title: "Table 27. 2023-2024 Choice Payments",
      footnote: "The 2024-2025 information is not available at this time. It will be included in next year's updated report.",
      headers: ["Category", "Amount"],
      rows: [
        ["Fall Payment", "$209,927,560.61"],
        ["Spring Payment", "$223,696,923.65"],
        ["Total Payments", "$433,624,484.26"],
        ["Refunds", "$843,238.03"],
        ["Net Payment", "$432,781,246.23"],
      ],
      sectionKey: "payments",
      tableOrder: 27,
    },
  ]);

  // Insert key statistics
  await db.insert(reportStatsTable).values([
    {
      key: "total-students-2024-25",
      label: "Total Participating Students (2024-2025)",
      value: "76,067",
      description: "Total students receiving Choice Scholarship payments in 2024-2025",
      sectionKey: "participation",
      statOrder: 1,
    },
    {
      key: "total-schools-2024-25",
      label: "Participating Choice Schools (2024-2025)",
      value: "373",
      description: "Most participating schools of any year of the Choice Scholarship Program",
      sectionKey: "participation",
      statOrder: 2,
    },
    {
      key: "period1-students-2024-25",
      label: "Period One Students (2024-2025)",
      value: "74,743",
      description: "Students participating in the primary application period",
      sectionKey: "participation",
      statOrder: 3,
    },
    {
      key: "period2-students-2024-25",
      label: "Period Two Students (2024-2025)",
      value: "1,324",
      description: "Students participating in the secondary application period",
      sectionKey: "participation",
      statOrder: 4,
    },
    {
      key: "total-award-amount-2024-25",
      label: "Total Qualified Award Amount (2024-2025)",
      value: "$497,195,861.37",
      description: "Maximum eligible award amount if every student remained enrolled for the full year",
      sectionKey: "awards-school",
      statOrder: 5,
    },
    {
      key: "avg-award-amount",
      label: "Average Award Amount",
      value: "$6,536.29",
      description: "Average Choice Scholarship award amount for 2024-2025",
      sectionKey: "summary",
      statOrder: 6,
    },
    {
      key: "avg-tuition-fees",
      label: "Average Tuition & Fees",
      value: "$8,368.64",
      description: "Average tuition and fees at Choice schools for 2024-2025",
      sectionKey: "summary",
      statOrder: 7,
    },
    {
      key: "retention-rate",
      label: "Student Retention Rate (2023-2024 to 2024-2025)",
      value: "76.82%",
      description: "Percentage of 2024-2025 students who also participated in 2023-2024",
      sectionKey: "retention-between",
      statOrder: 8,
    },
    {
      key: "sped-students",
      label: "Special Education Eligible Students (2024-2025)",
      value: "5,553",
      description: "Choice students eligible for special education services",
      sectionKey: "special-education",
      statOrder: 9,
    },
    {
      key: "choice-pct-statewide",
      label: "Choice Students as % of Statewide Enrollment",
      value: "6.56%",
      description: "2024-2025: Choice students represent 6.56% of all Indiana student enrollment",
      sectionKey: "participation",
      statOrder: 10,
    },
    {
      key: "90pct-award-students",
      label: "Students Receiving 90% Award (2024-2025)",
      value: "54,767",
      description: "Students whose award equals 90% of public school funding (tuition exceeds award)",
      sectionKey: "awards-by-type",
      statOrder: 11,
    },
    {
      key: "avg-household-income",
      label: "Average Household Income",
      value: "$102,842.66",
      description: "Average household income of 2024-2025 Choice Scholarship students",
      sectionKey: "awards-by-type",
      statOrder: 12,
    },
    {
      key: "net-payment-2023-24",
      label: "Net Payment to Choice Schools (2023-2024)",
      value: "$432,781,246.23",
      description: "Total payments minus refunds for the 2023-2024 school year",
      sectionKey: "payments",
      statOrder: 13,
    },
    {
      key: "sped-net-payment-2023-24",
      label: "Special Education Net Payment (2023-2024)",
      value: "$3,109,176.48",
      description: "Net special education funding to Choice schools in 2023-2024",
      sectionKey: "special-education",
      statOrder: 14,
    },
  ]);

  console.log("Seeding complete!");
}

seed().catch(console.error);
