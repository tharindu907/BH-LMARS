import 'package:flutter/material.dart';

class ClassBox extends StatelessWidget {
  final String grade;
  final String subject;
  final String teacher;
  final String time;
  final VoidCallback onTap;

  const ClassBox({
    super.key,
    required this.grade,
    required this.subject,
    required this.teacher,
    required this.time,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        margin: const EdgeInsets.symmetric(vertical: 10.0),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFFEEF1F6), 
          borderRadius: BorderRadius.circular(18), 
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1), 
              spreadRadius: 2, 
              blurRadius: 10, 
              offset: const Offset(0, 5), 
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Grade: $grade',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color(0xFF545DB8), 
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Subject: $subject',
              style: const TextStyle(
                fontSize: 16,
                color: Color(0xFF272A4D), 
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Teacher: $teacher',
              style: const TextStyle(
                fontSize: 16,
                color: Color(0xFF272A4D), 
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Time: $time',
              style: const TextStyle(
                fontSize: 16,
                color: Color(0xFF272A4D),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
