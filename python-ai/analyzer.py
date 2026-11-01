import sys
import json
import re
from pypdf import PdfReader


# ==================================================
# EXTRACT TEXT FROM PDF
# ==================================================

def extract_text(pdf_path):

    text = ""

    reader = PdfReader(pdf_path)

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


# ==================================================
# CHECK WHETHER A SECTION EXISTS
# ==================================================

def has_section(text, keywords):

    text_lower = text.lower()

    for keyword in keywords:

        if keyword in text_lower:
            return True

    return False


# ==================================================
# FIND TECHNICAL SKILLS
# ==================================================

def find_technical_skills(text):

    technical_skills = [
        "python",
        "java",
        "javascript",
        "typescript",
        "react",
        "node.js",
        "node",
        "mongodb",
        "mysql",
        "sql",
        "html",
        "css",
        "c++",
        "c#",
        "git",
        "github",
        "docker",
        "aws",
        "azure",
        "flutter",
        "android",
        "php",
        "django",
        "flask"
    ]

    text_lower = text.lower()

    found_skills = []

    for skill in technical_skills:

        if skill in text_lower:

            found_skills.append(skill)

    return found_skills


# ==================================================
# FIND MEASURABLE ACHIEVEMENTS
# ==================================================

def find_numbers(text):

    patterns = [

        r"\b\d+%",
        r"\b\d+\+",
        r"\b\d+\s*(users|projects|clients|members)",
        r"\b\d+\s*(days|months|years)",
        r"\b\d+x\b"

    ]

    results = []

    for pattern in patterns:

        matches = re.findall(
            pattern,
            text,
            flags=re.IGNORECASE
        )

        results.extend(matches)

    return results


# ==================================================
# FIND ACTION VERBS
# ==================================================

def find_action_verbs(text):

    action_verbs = [

        "developed",
        "designed",
        "implemented",
        "created",
        "built",
        "automated",
        "optimized",
        "integrated",
        "managed",
        "tested",
        "deployed",
        "configured",
        "analyzed",
        "improved",
        "engineered"

    ]

    text_lower = text.lower()

    found = []

    for verb in action_verbs:

        if verb in text_lower:

            found.append(verb)

    return found


# ==================================================
# GENERATE AI SUGGESTIONS
# ==================================================

def generate_suggestions(
    text,
    found_skills,
    numbers,
    action_verbs
):

    suggestions = []

    # ----------------------------------------------
    # PROFESSIONAL SUMMARY
    # ----------------------------------------------

    summary_exists = has_section(
        text,
        [
            "summary",
            "professional summary",
            "objective",
            "profile",
            "about me"
        ]
    )

    if not summary_exists:

        suggestions.append({
            "title": "Add a professional summary",
            "description":
                "Add a short 2–4 line summary explaining "
                "your background, strongest skills and "
                "the type of role you are targeting.",
            "priority": "High"
        })

    # ----------------------------------------------
    # SKILLS
    # ----------------------------------------------

    skills_exists = has_section(
        text,
        [
            "skills",
            "technical skills",
            "core skills",
            "technologies"
        ]
    )

    if not skills_exists:

        suggestions.append({
            "title": "Add a dedicated skills section",
            "description":
                "Create a clear technical skills section "
                "with technologies that are relevant to "
                "your target roles.",
            "priority": "High"
        })

    elif len(found_skills) < 5:

        suggestions.append({
            "title": "Strengthen your technical skills section",
            "description":
                "Your resume contains a limited number of "
                "recognized technical skills. Add relevant "
                "technologies that you genuinely know.",
            "priority": "Medium"
        })

    # ----------------------------------------------
    # PROJECTS
    # ----------------------------------------------

    projects_exists = has_section(
        text,
        [
            "projects",
            "project",
            "academic project",
            "personal project"
        ]
    )

    if not projects_exists:

        suggestions.append({
            "title": "Add relevant projects",
            "description":
                "Include academic, personal or internship "
                "projects that demonstrate your practical skills.",
            "priority": "High"
        })

    else:

        suggestions.append({
            "title": "Strengthen your project descriptions",
            "description":
                "Describe what you personally built, the "
                "technologies you used and the result of each "
                "project instead of only listing project names.",
            "priority": "Medium"
        })

    # ----------------------------------------------
    # EXPERIENCE
    # ----------------------------------------------

    experience_exists = has_section(
        text,
        [
            "experience",
            "work experience",
            "internship",
            "employment"
        ]
    )

    if not experience_exists:

        suggestions.append({
            "title": "Add experience or internship details",
            "description":
                "If you have internship, freelance or work "
                "experience, describe your responsibilities "
                "and the results you achieved.",
            "priority": "Medium"
        })

    # ----------------------------------------------
    # MEASURABLE ACHIEVEMENTS
    # ----------------------------------------------

    if len(numbers) < 2:

        suggestions.append({
            "title": "Add measurable achievements",
            "description":
                "Use numbers, percentages or measurable "
                "results to show the impact of your work. "
                "For example: improved performance by 20% "
                "or developed 3 major features.",
            "priority": "High"
        })

    else:

        suggestions.append({
            "title": "Add more measurable results",
            "description":
                "You already use some measurable information. "
                "Consider adding numbers to more project and "
                "experience descriptions where possible.",
            "priority": "Low"
        })

    # ----------------------------------------------
    # ACTION VERBS
    # ----------------------------------------------

    if len(action_verbs) < 3:

        suggestions.append({
            "title": "Use stronger action verbs",
            "description":
                "Start bullet points with strong verbs such as "
                "Developed, Implemented, Designed, Automated, "
                "Optimized or Integrated.",
            "priority": "Medium"
        })

    # ----------------------------------------------
    # EMAIL
    # ----------------------------------------------

    email_found = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    if not email_found:

        suggestions.append({
            "title": "Add a professional email address",
            "description":
                "Make sure your resume contains a clearly "
                "visible professional email address.",
            "priority": "High"
        })

    # ----------------------------------------------
    # PHONE
    # ----------------------------------------------

    phone_found = re.search(
        r"\+?\d[\d\s()-]{8,}\d",
        text
    )

    if not phone_found:

        suggestions.append({
            "title": "Add your phone number",
            "description":
                "Include a professional contact number so "
                "recruiters can easily reach you.",
            "priority": "Medium"
        })

    return suggestions


# ==================================================
# CALCULATE RESUME SCORE
# ==================================================

def calculate_score(
    text,
    found_skills,
    numbers,
    action_verbs
):

    score = 0

    # Summary
    if has_section(
        text,
        [
            "summary",
            "objective",
            "profile",
            "about me"
        ]
    ):
        score += 15

    # Skills
    if has_section(
        text,
        [
            "skills",
            "technical skills",
            "technologies"
        ]
    ):
        score += 15

    # Projects
    if has_section(
        text,
        [
            "projects",
            "project"
        ]
    ):
        score += 15

    # Education
    if has_section(
        text,
        [
            "education",
            "university",
            "college",
            "degree"
        ]
    ):
        score += 15

    # Experience
    if has_section(
        text,
        [
            "experience",
            "internship",
            "employment"
        ]
    ):
        score += 15

    # Technical skills
    if len(found_skills) >= 5:

        score += 10

    elif len(found_skills) >= 3:

        score += 7

    elif len(found_skills) >= 1:

        score += 4

    # Numbers
    if len(numbers) >= 3:

        score += 5

    elif len(numbers) >= 1:

        score += 3

    # Action verbs
    if len(action_verbs) >= 5:

        score += 5

    elif len(action_verbs) >= 3:

        score += 3

    return min(score, 100)


# ==================================================
# MAIN ANALYSIS
# ==================================================

def analyze_resume(text):

    found_skills = find_technical_skills(text)

    numbers = find_numbers(text)

    action_verbs = find_action_verbs(text)

    suggestions = generate_suggestions(
        text,
        found_skills,
        numbers,
        action_verbs
    )

    score = calculate_score(
        text,
        found_skills,
        numbers,
        action_verbs
    )

    structure = {

        "summary": has_section(
            text,
            [
                "summary",
                "objective",
                "profile",
                "about me"
            ]
        ),

        "skills": has_section(
            text,
            [
                "skills",
                "technical skills",
                "technologies"
            ]
        ),

        "projects": has_section(
            text,
            [
                "projects",
                "project"
            ]
        ),

        "education": has_section(
            text,
            [
                "education",
                "university",
                "college",
                "degree"
            ]
        ),

        "experience": has_section(
            text,
            [
                "experience",
                "internship",
                "employment"
            ]
        )

    }

    return {
        "score": score,
        "foundSkills": found_skills,
        "numbersFound": len(numbers),
        "actionVerbsFound": len(action_verbs),
        "structure": structure,
        "suggestions": suggestions
    }


# ==================================================
# PROGRAM ENTRY
# ==================================================

def main():

    if len(sys.argv) < 2:

        print(json.dumps({
            "success": False,
            "message": "No resume file was provided."
        }))

        return

    pdf_path = sys.argv[1]

    try:

        text = extract_text(pdf_path)

        if not text.strip():

            print(json.dumps({
                "success": False,
                "message":
                    "Could not extract text from this PDF."
            }))

            return

        analysis = analyze_resume(text)

        result = {

            "success": True,

            "score":
                analysis["score"],

            "foundSkills":
                analysis["foundSkills"],

            "numbersFound":
                analysis["numbersFound"],

            "actionVerbsFound":
                analysis["actionVerbsFound"],

            "structure":
                analysis["structure"],

            "suggestions":
                analysis["suggestions"],

            "textLength":
                len(text)

        }

        print(json.dumps(result))

    except Exception as error:

        print(json.dumps({

            "success": False,

            "message": str(error)

        }))


if __name__ == "__main__":

    main()