import 'package:flutter/material.dart';

class ClassBox extends StatelessWidget {
  final String grade;
  final String subject;
  final String teacher;
  final String time;
  final VoidCallback onTap; // Add this

  const ClassBox({
    super.key,
    required this.grade,
    required this.subject,
    required this.teacher,
    required this.time,
    required this.onTap, // Add this
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap, // Invoke the callback when tapped
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2), // Adjust opacity if needed
              spreadRadius: 2,
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Grade: $grade',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black, // Set text color to black
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Subject: $subject',
              style: TextStyle(
                fontSize: 14,
                color: Colors.black, // Set text color to black
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Teacher: $teacher',
              style: TextStyle(
                fontSize: 14,
                color: Colors.black, // Set text color to black
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Time: $time',
              style: TextStyle(
                fontSize: 14,
                color: Colors.black, // Set text color to black
              ),
            ),
          ],
        ),
      ),
    );
  }
}
